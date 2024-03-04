// LoginModal.tsx
import React, { useState } from 'react';
import Input from './ui/Input';
import ModalButton from './ui/ModalButton';

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', email, password);
        onClose();
    };

    return (
        <div
            className={`fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'
                }`}
        >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <form>
                    <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        value={email}
                        onChange={setEmail}
                    />
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                    />
                    <div className="flex justify-start">
                        <ModalButton
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                            onClick={handleLogin}
                        >
                            SignIn
                        </ModalButton>
                        <ModalButton
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                            onClick={onClose}
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
