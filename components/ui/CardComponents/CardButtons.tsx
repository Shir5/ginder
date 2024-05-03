"use client";
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    size?: 'small' | 'medium' | 'large'; // Optional size prop
}

const DislikeButton: React.FC<ButtonProps> = ({ onClick, size = 'medium' }) => {
    const buttonSizeClass = size === 'small' ? 'px-2 py-1 text-sm' : size === 'large' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-base';

    return (
        <button
            className={`bg-red-600 text-white rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-800 ${buttonSizeClass}`}
            onClick={onClick}
        >
            Dislike
        </button>
    );
};

const ReportButton: React.FC<ButtonProps> = ({ onClick, size = 'medium' }) => {
    const buttonSizeClass = size === 'small' ? 'px-2 py-1 text-sm' : size === 'large' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-base';

    return (
        <button
            className={`bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 ${buttonSizeClass}`}
            onClick={onClick}
        >
            Report
        </button>
    );
};

const LikeButton: React.FC<ButtonProps> = ({ onClick, size = 'medium' }) => {
    const buttonSizeClass = size === 'small' ? 'px-2 py-1 text-sm' : size === 'large' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-base';

    return (
        <button
            className={`bg-green-600 text-white rounded-md hover:bg-green-800 focus:outline-none focus:bg-green-800 ${buttonSizeClass}`}
            onClick={onClick}
        >
            Like
        </button>
    );
};

export { DislikeButton, ReportButton, LikeButton };
