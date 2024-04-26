import React from "react";


const Description: React.FC<{ description: string }> = ({ description }) => {
    return (
        <p className="mb-4">{description}</p>
    );
};
export default Description;