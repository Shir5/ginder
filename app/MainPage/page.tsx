"use client";

import React from "react";
import { GetServerSideProps } from 'next';
import { getUserData } from '@/api/getUserData'; // Function to fetch user data from the database
import UserCard from "@/components/UserCard";

function MainPage() {
    const handleDislike = () => {
        // Logic to handle dislike action
        console.log("Disliked");
    };

    const handleReport = () => {
        // Logic to handle report action
        console.log("Reported");
    };

    const handleLike = () => {
        // Logic to handle like action
        console.log("Liked");
    };

    return (
        <div>
            <section className="w-full h-screen bg-neutral-950 overflow-hidden justify-center items-center flex">
                <UserCard
                    name="John Doe"
                    description="blabla"
                    cardTags={["tag1", "tag2"]}
                    onDislike={handleDislike}
                    onReport={handleReport}
                    onLike={handleLike}
                />
            </section>
        </div>
    );
}

export default MainPage;
