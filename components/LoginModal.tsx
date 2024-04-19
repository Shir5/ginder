import React, { useState } from 'react';
import Input from './ui/Input';
import ModalButton from './ui/ModalButton';

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
    const [identifier, setIdentifier] = useState(''); // Changed from email to identifier
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>(''); // State for error message

    const handleLogin = async () => {
        // Perform login logic here
        // For demonstration, assume login fails if email or password is empty
        if (!identifier || !password) {
            setError('Please enter both email/nickname and password.');
        } else {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ identifier, password }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Login failed');
                }

                // Successful login
                onClose();
            } catch (error: any) {
                console.error('Error during login:', error.message);
                setError(error.message || 'An error occurred during login');
            }
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'
                }`}
        >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <Input
                        name='identifier-input'
                        id="identifier"
                        type="text"
                        label="Email Address or Nickname"
                        placeholder="Enter your email or nickname"
                        value={identifier}
                        onChange={setIdentifier}
                    />
                    <Input
                        name='password-input'
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                    />
                    {error && <div className="text-red-500 mt-1">{error}</div>} {/* Render error message if present */}

                    <div className="flex justify-start">
                        <ModalButton
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
                            btnType='submit'
                        >
                            Sign In
                        </ModalButton>
                        <ModalButton
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                            onClick={onClose}
                            btnType='button'
                        >
                            Close
                        </ModalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
