import React from 'react';

interface InputProps {
    name: string;
    id: string;
    type: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

/**
 * Renders an input component with the given properties.
 *
 * @param {InputProps} props - The properties for the input component.
 * @param {string} props.id - The id of the input element.
 * @param {string} props.type - The type of the input element.
 * @param {string} props.label - The label for the input element.
 * @param {string} props.placeholder - The placeholder for the input element.
 * @param {string} props.value - The value of the input element.
 * @param {(value: string) => void} props.onChange - The function to be called when the input value changes.
 * @param {string} props.name - The name of the input element.
 * @return {JSX.Element} The rendered input component.
 */
const Input: React.FC<InputProps> = ({ id, type, label, placeholder, value, onChange,name }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                name={name}
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
