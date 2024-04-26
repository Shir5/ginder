import React from 'react';

interface UserImgProps {
    avatar?: string;
    size?: string;
}

const UserImg: React.FC<UserImgProps> = ({ avatar, size = 'w-12 h-12' }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                {avatar ? (
                    <img
                        src={avatar}
                        alt="Avatar"
                        className={`rounded-full ${size}`}
                    />
                ) : (
                    <div className={`bg-gray-300 rounded-full ${size}`}></div>
                )}
            </div>
        </>
    );
};

export default UserImg;
