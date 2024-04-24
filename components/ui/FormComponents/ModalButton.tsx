import React from 'react';

type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
    onClick?: () => void;
    className: string;
    btnType: ButtonType;
    children: React.ReactNode;
}

const ModalButton: React.FC<ButtonProps> = ({ onClick, className, children, btnType }) => {
    return (
        <button
            type={btnType} 
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ModalButton;
