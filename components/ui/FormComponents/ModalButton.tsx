import React from 'react';

type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
    onClick?: () => void;
    className: string;
    btnType: ButtonType;
    children: React.ReactNode;
}

/**
 * Renders a button component for a modal.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - onClick: A function to be called when the button is clicked.
 *   - className: The CSS class name for the button.
 *   - children: The content to be displayed inside the button.
 *   - btnType: The type of button (submit, reset, or button).
 * @return {JSX.Element} The rendered button component.
 */
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
