import React, { useState } from 'react';
import Input from '../components/ui/Input';
import ModalButton from '../components/ui/ModalButton';
import SearchBar from './ui/SearchBar';
import { tagsDatabase } from '@/utils/tagsDataBase';

interface SigninModalProps {
    show: boolean;
    onClose: () => void;
}
interface Tag {
    id: number;
    name: string;
}

const SigninModal: React.FC<SigninModalProps> = ({ show, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleSignin = async () => {
        // Reset errors
        setEmailError('');
        setPasswordError('');
        setUsernameError('');

        // Username validation
        if (!username) {
            setUsernameError('Please enter a username.');
            return;
        }
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        // Password validation
        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            return;
        }

        // If everything is valid, proceed with signin
        try {
            // Make a POST request to your API endpoint using fetch
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    description,
                    selectedTags // Ensure selectedTags is an array of tag IDs
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response from API:', data);
                onClose(); // Close the modal on successful signin
            } else {
                const errorData = await response.json();
                console.error('Error signing in:', errorData);
            }
        } catch (error) {
            console.error('Error signing in:', error);
        } onClose();
    };

    return (
        <div className={`fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Sign In</h2>
                <form>
                    <Input
                        id="username"
                        type="input"
                        label="User Name"
                        placeholder="Enter your username"
                        value={username}
                        onChange={setUsername}
                    />
                    {usernameError && <div className="text-red-500 mt-1">{usernameError}</div>}
                    <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        value={email}
                        onChange={setEmail}
                    />
                    {emailError && <div className="text-red-500 mt-1">{emailError}</div>}
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                    />
                    {passwordError && <div className="text-red-500 mt-1">{passwordError}</div>}

                    <Input
                        id="description"
                        type="input"
                        label="Description"
                        placeholder="Tell about yourself"
                        value={description}
                        onChange={setDescription}
                    />
                    <SearchBar
                        tagsDatabase={tagsDatabase}
                        label='Games'
                        onTagsSelected={setSelectedTags} // Pass a callback to set selected tags
                    />

                    <div className="flex justify-start">
                        <ModalButton
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
                            onClick={handleSignin}
                        >
                            Sign In
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

export default SigninModal;
