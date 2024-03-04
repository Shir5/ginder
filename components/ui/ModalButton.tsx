import React from 'react';

interface ButtonProps {
    onClick: () => void;
    className: string;
    children: React.ReactNode;
}

const ModalButton: React.FC<ButtonProps> = ({ onClick, className, children }) => {
    return (
        <button
            type="button"
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ModalButton;
