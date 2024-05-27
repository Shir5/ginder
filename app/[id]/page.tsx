"use client";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import getAllUsers from "@/api/getAllUsers";
import UserCard from "@/components/UserCard";
import logout from "@/api/logout";
import like from "@/api/like";
import MatchNotification from "@/components/MatchNotification";

// Define a type for user data
interface User {
    userId: number;
    username: string;
    email: string;
    password: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    selectedTags: {
        id: number;
        name: string;
    }[];
}

// Initialize socket connection
const socket = io('http://localhost:3000');

function MainPage({ params }: { params: { id: number } }) {
    const [users, setUsers] = useState<User[]>([]);
    const [likedUserIds, setLikedUserIds] = useState<number[]>([]);
    const [dislikedUserIds, setDislikedUserIds] = useState<number[]>([]);
    const [reportedUserIds, setReportedUserIds] = useState<number[]>([]);
    const [showMatchNotification, setShowMatchNotification] = useState(false);
    const [matchedUserQueue, setMatchedUserQueue] = useState<User[]>([]);
    const [currentMatch, setCurrentMatch] = useState<{ user1: string; user2: string } | null>(null);

    const [userIdFromRoute, setUserIdFromRoute] = useState<number | null>(null);

    useEffect(() => {
        const id = parseInt(window.location.pathname.split('/').pop() || '', 10);
        setUserIdFromRoute(id);

        const likedIds = localStorage.getItem('likedUserIds');
        setLikedUserIds(likedIds ? JSON.parse(likedIds) : []);

        const dislikedIds = localStorage.getItem('dislikedUserIds');
        setDislikedUserIds(dislikedIds ? JSON.parse(dislikedIds) : []);

        const reportedIds = localStorage.getItem('reportedUserIds');
        setReportedUserIds(reportedIds ? JSON.parse(reportedIds) : []);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getAllUsers();
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (userIdFromRoute !== null) {
            socket.emit('join', userIdFromRoute);

            socket.on('matches', (matchedUser: User) => {
                setMatchedUserQueue(prevQueue => [...prevQueue, matchedUser]);
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });
        }

        return () => {
            socket.off('matches');
        };
    }, [userIdFromRoute]);

    useEffect(() => {
        if (matchedUserQueue.length > 0 && !showMatchNotification) {
            const matchedUser = matchedUserQueue[0];
            const currentUser = users.find(user => user.userId === userIdFromRoute);
            if (currentUser && userIdFromRoute !== null) {
                setCurrentMatch({ user1: currentUser.username, user2: matchedUser.username });
                setShowMatchNotification(true);
            }
        }
    }, [matchedUserQueue, showMatchNotification, users, userIdFromRoute]);

    useEffect(() => {
        localStorage.setItem('likedUserIds', JSON.stringify(likedUserIds));
        localStorage.setItem('dislikedUserIds', JSON.stringify(dislikedUserIds));
        localStorage.setItem('reportedUserIds', JSON.stringify(reportedUserIds));
    }, [likedUserIds, dislikedUserIds, reportedUserIds]);

    async function handleLogout() {
        try {
            await logout();
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    async function handleLike(userId: number, likedUserId: number) {
        try {
            const likeValue = await like(userId, likedUserId);
            if (likeValue) {
                const likedUser = users.find(user => user.userId === likedUserId);
                if (likedUser) {
                    setMatchedUserQueue(prevQueue => [...prevQueue, likedUser]);
                }
            }
            setLikedUserIds(prevLikedUserIds => [...prevLikedUserIds, likedUserId]);
        } catch (error) {
            console.error('Error liking user:', error);
        }
    }

    const handleDislike = (userId: number) => {
        setDislikedUserIds(prevDislikedUserIds => [...prevDislikedUserIds, userId]);
    };

    const handleReport = (userId: number) => {
        setReportedUserIds(prevReportedUserIds => [...prevReportedUserIds, userId]);
    };

    let filteredUsers: User[] = [];
    if (userIdFromRoute) {
        filteredUsers = users.filter(user => {
            const userId = user.userId;
            return userId !== userIdFromRoute &&
                !likedUserIds.includes(userId) &&
                !dislikedUserIds.includes(userId) &&
                !reportedUserIds.includes(userId);
        });
    } else {
        console.error('Invalid user ID in the route path.');
    }

    if (filteredUsers.length === 0 && users.length > 0) {
        setLikedUserIds([]);
        setDislikedUserIds([]);
        setReportedUserIds([]);
        setUsers([]);
        getAllUsers().then(userData => {
            setUsers(userData);
        }).catch(error => {
            console.error("Error refetching user data:", error);
        });
    }

    return (
        <div>
            <section className="w-full h-screen bg-neutral-950 overflow-hidden justify-center items-center flex relative">
                <button onClick={() => handleLogout()} className="absolute top-3 right-center bg-gray-800 text-white rounded-full h-20 w-20 flex items-center justify-center focus:outline-none transition-all duration-300 hover:bg-gray-600 hover:scale-110 hover:rotate-180">
                    Logout
                </button>
                {filteredUsers.map((user, index) => (
                    <UserCard
                        key={user.userId}
                        name={user.username}
                        description={user.description}
                        cardTags={user.selectedTags.map(tag => tag.name)}
                        onDislike={() => handleDislike(user.userId)}
                        onReport={() => handleReport(user.userId)}
                        onLike={() => handleLike(userIdFromRoute!, user.userId)}
                        style={{
                            zIndex: filteredUsers.length - index,
                            right: 1 / 5,
                        }}
                    />
                ))}
                {showMatchNotification && currentMatch && (
                    <MatchNotification
                        user1={currentMatch.user1}
                        user2={currentMatch.user2}
                        onClose={() => {
                            setMatchedUserQueue(prevQueue => prevQueue.slice(1));
                            setShowMatchNotification(false);
                            setCurrentMatch(null);
                        }}
                    />
                )}
            </section>
        </div>
    );
}

export default MainPage;
