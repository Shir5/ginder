"use client";
import React, { useState, useEffect } from "react";
import getAllUsers from "@/api/getAllUsers";
import UserCard from "@/components/UserCard";

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
    token: string | null;
}

/**
 * Renders the main page component.
 *
 * @return {TSX.Element} The main page component.
 */
function MainPage({ params }: { params: { id: number } }) {
    const [users, setUsers] = useState<User[]>([]); // Specify the type of users
    const [likedUserIds, setLikedUserIds] = useState<number[]>([]); // Array of liked user IDs
    const [dislikedUserIds, setDislikedUserIds] = useState<number[]>([]); // Array of disliked user IDs
    const [reportedUserIds, setReportedUserIds] = useState<number[]>([]); // Array of reported user IDs

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

    const handleLike = (userId: number) => {
        // Add the liked user ID to the array of liked user IDs
        setLikedUserIds(prevLikedUserIds => [...prevLikedUserIds, userId]);
    };

    const handleDislike = (userId: number) => {
        // Add the disliked user ID to the array of disliked user IDs
        setDislikedUserIds(prevDislikedUserIds => [...prevDislikedUserIds, userId]);
    };

    const handleReport = (userId: number) => {
        // Add the reported user ID to the array of reported user IDs
        setReportedUserIds(prevReportedUserIds => [...prevReportedUserIds, userId]);
    };

    const filteredUsers = users.filter(user => !likedUserIds.includes(user.userId) && !dislikedUserIds.includes(user.userId) && !reportedUserIds.includes(user.userId));

    return (
        <div>
            <section className="w-full h-screen bg-neutral-950 overflow-hidden justify-center items-center flex relative">
                {filteredUsers.map((user, index) => (
                    <UserCard
                        key={user.userId}
                        name={user.username}
                        description={user.description}
                        cardTags={user.selectedTags.map(tag => tag.name)}
                        onDislike={() => handleDislike(user.userId)} 
                        onReport={() => handleReport(user.userId)} 
                        onLike={() => handleLike(user.userId)} 
                        style={{ zIndex: filteredUsers.length - index }}
                    />
                ))}
            </section>
        </div>
    );
}

export default MainPage;
