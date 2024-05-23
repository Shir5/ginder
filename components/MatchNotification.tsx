"use client";
import React from 'react';

interface MatchNotificationProps {
    user1: string;
    user2: string;
    onClose: () => void;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({ user1, user2, onClose }) => {
    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
            <p>Congratulations! {user1} and {user2} have matched!</p>
            <button onClick={onClose} className="mt-2 bg-red-500 text-white p-1 rounded">
                Close
            </button>
        </div>
    );
};

export default MatchNotification;
