"use client";

import React from 'react';
import { DislikeButton, ReportButton, LikeButton } from "@/components/ui/CardComponents/CardButtons";
import UserImg from './ui/CardComponents/UserImage';
import CardDescription from './ui/CardComponents/CardDescription';
import CardTags from './ui/CardComponents/CardTags';
interface UserCardProps {
    name: string;
    avatar?: string;
    description: string;
    cardTags: string[];
    onDislike: () => void;
    onReport: () => void;
    onLike: () => void;
    buttonSize?: 'small' | 'medium' | 'large'; // Optional button size prop
    avatarSize?: string; // Optional avatar size prop
    style?: React.CSSProperties; // Add the style attribute with optional chaining
}

const UserCard: React.FC<UserCardProps> = ({
    name,
    avatar,
    description,
    cardTags,
    onDislike,
    onReport,
    onLike,
    buttonSize,
    avatarSize = 'w-48 h-48',
}) => {
    return (
        <div className="bg-indigo-950 rounded-lg shadow-md p-6 m-4 w-65 h-3/6 absolute">
            <div className="flex justify-between items-center mb-4 flex-col gap-4">
                <h2 className="text-xl font-bold">{name}</h2>
                <UserImg avatar={avatar} size={avatarSize} />
            </div>
            <CardDescription description={description} />
            <CardTags cardTags={cardTags} />
            <DislikeButton onClick={onDislike}/>
            <ReportButton onClick={onReport}/>
            <LikeButton onClick={onLike}/>
        </div>
    );
};

export default UserCard;
