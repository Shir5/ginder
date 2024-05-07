import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
}

/**
 * Renders a close button component.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - onClick: A function to be called when the button is clicked.
 * @return {TSX.Element} The rendered close button component.
 */
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center focus:outline-none transition-all duration-300 hover:bg-gray-600 hover:scale-110 hover:rotate-180"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
