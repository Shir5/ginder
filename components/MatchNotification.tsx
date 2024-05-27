import React from "react";

interface MatchNotificationProps {
    user1: string;
    user2: string;
    onClose: () => void;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({ user1, user2, onClose }) => {
    return (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">It's a Match!</h2>
            <p>{user1} and {user2}, you have a new match!</p>
            <button onClick={onClose} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Close
            </button>
        </div>
    );
};

export default MatchNotification;
