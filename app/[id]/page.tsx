"use client";

import React, { useState, useEffect } from "react";
import getAllUsers from "@/api/getAllUsers";
import UserCard from "@/components/UserCard";
import MainBtn from "@/components/ui/FormComponents/MainBtn";
import logout from "@/api/logout";
import { PrismaClient } from '@prisma/client'
import like from "@/api/like";
const prisma = new PrismaClient()

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

/**
 * Renders the main page component.
 *
 * @return {JSX.Element} The main page component.
 */
function MainPage({ params }: { params: { id: number } }) {
    const [users, setUsers] = useState<User[]>([]); // Specify the type of users
    const [likedUserIds, setLikedUserIds] = useState<number[]>(() => {
        const likedIds = localStorage.getItem('likedUserIds');
        return likedIds ? JSON.parse(likedIds) : [];
    }); // Array of liked user IDs
    const [dislikedUserIds, setDislikedUserIds] = useState<number[]>(() => {
        const dislikedIds = localStorage.getItem('dislikedUserIds');
        return dislikedIds ? JSON.parse(dislikedIds) : [];
    }); // Array of disliked user IDs
    const [reportedUserIds, setReportedUserIds] = useState<number[]>(() => {
        const reportedIds = localStorage.getItem('reportedUserIds');
        return reportedIds ? JSON.parse(reportedIds) : [];
    }); // Array of reported user IDs
    const userIdFromRoute = parseInt(window.location.pathname.split('/').pop() || ''); // Get the user ID from the URL`
    let filteredUsers: User[] = [];

    useEffect(() => {
        // Fetch user data using the function to fetch all users
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

     function handleLike(userId: number, likedUserId: number) {

         like(userId, likedUserId);
        // Add the liked user ID to the array of liked user IDs
        setLikedUserIds(prevLikedUserIds => [...prevLikedUserIds, likedUserId]);
    };

    const handleDislike = (userId: number) => {
        // Add the disliked user ID to the array of disliked user IDs
        setDislikedUserIds(prevDislikedUserIds => [...prevDislikedUserIds, userId]);
    };

    const handleReport = (userId: number) => {
        // Add the reported user ID to the array of reported user IDs
        setReportedUserIds(prevReportedUserIds => [...prevReportedUserIds, userId]);
    };

    if (userIdFromRoute) {
        filteredUsers = users.filter(user => {
            const userId = user.userId;
            // Filter out if the user ID matches the ID from the route path
            return userId !== userIdFromRoute &&
                !likedUserIds.includes(userId) &&
                !dislikedUserIds.includes(userId) &&
                !reportedUserIds.includes(userId);
        });
    } else {
        console.error('Invalid user ID in the route path.');
    }
    if (filteredUsers.length === 0 && users.length > 0) {
        // Refetch user data to refill the card stack
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
                <button onClick={() => handleLogout()} className="absolute top-3  right-center bg-gray-800 text-white rounded-full h-20 w-20 flex items-center justify-center focus:outline-none transition-all duration-300 hover:bg-gray-600 hover:scale-110 hover:rotate-180">
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
                        onLike={() => handleLike(userIdFromRoute, user.userId)}
                        style={{
                            zIndex: filteredUsers.length - index,
                            right: 1 / 5,
                        }}
                    />
                ))}
            </section>
        </div>
    );
}

export default MainPage;
