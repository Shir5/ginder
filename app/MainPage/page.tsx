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

function MainPage() {
    const [users, setUsers] = useState<User[]>([]); // Specify the type of users
    const [currentIndex, setCurrentIndex] = useState(0); // Index of the current user card

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

    const handleLike = () => {
        // Move to the next user card when "Like" is clicked
        setCurrentIndex(prevIndex => (prevIndex + 1) % users.length);
        console.log("Liked");
        setUsers(prevUsers => prevUsers.slice(1)); // Remove the current user card from the stack
    };

    return (
        <div>
            <section className="w-full h-screen bg-neutral-950 overflow-hidden justify-center items-center flex relative">
                {users.slice(currentIndex, currentIndex + 5).map((user, index) => (
                    <UserCard
                        key={user.userId}
                        name={user.username}
                        description={user.description}
                        cardTags={user.selectedTags.map(tag => tag.name)}
                        onDislike={() => console.log("Disliked")}
                        onReport={() => console.log("Reported")}
                        onLike={handleLike}
                        style={{ zIndex: users.length - index }}
                    />
                ))}
            </section>
        </div>
    );
}

export default MainPage;
