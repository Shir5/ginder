import React from 'react';

interface InputProps {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ id, type, label, placeholder, value, onChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </div>
    );
};

export default Input;
