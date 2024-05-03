import React from 'react';


const CardTags: React.FC<{ cardTags: string[] }> = ({ cardTags }) => {
    return (
        <div className="mb-4">
            {cardTags.map((tag, index) => (
                <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};
export default CardTags;

