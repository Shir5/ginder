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

/**
 * Renders a user card component.
 *
 * @param {UserCardProps} props - The props object containing the following properties:
 *   - name: The name of the user.
 *   - avatar: The URL of the user's avatar image. (optional)
 *   - description: The description of the user.
 *   - cardTags: An array of tags associated with the user's card.
 *   - onDislike: The function to be called when the user dislikes the card.
 *   - onReport: The function to be called when the user reports the card.
 *   - onLike: The function to be called when the user likes the card.
 *   - buttonSize: The size of the buttons in the card. (optional)
 *   - avatarSize: The size of the avatar image. (default: 'w-48 h-48')
 * @return {TSX.Element} The rendered user card component.
 */
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
