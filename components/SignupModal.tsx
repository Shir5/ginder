import React, { useState } from 'react';
import Input from './ui/FormComponents/Input';
import ModalButton from './ui/FormComponents/ModalButton';
import SearchBar from './ui/FormComponents/SearchBar';
import { signup } from '@/api/signup';
import { Tag } from './ui/FormComponents/SearchBar';
import { tagsDatabase } from '@/utils/tagsDataBase';

interface SignupModalProps {
    show: boolean;
    onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleTags = async (tags: Tag[]): Promise<void> => {
        setSelectedTags(tags);
    };

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');

        // Reset errors
        setEmailError('');
        setPasswordError('');
        setUsernameError('');

        // Extract form data
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const description = formData.get('description') as string;

        // Validate email and password
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            return;
        }

        try {
            // Serialize selected tags
            const serializedTags = JSON.stringify(selectedTags);
            // Append selected tags to formData
            formData.append('selectedTags', serializedTags);

            // Call the signup action
            await signup(formData, selectedTags);

            // Clear form fields upon successful submission
            setUsername('');
            setEmail('');
            setPassword('');
            setDescription('');

            // Optionally, close the modal upon successful submission
            onClose();
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    };

    return (
        <div className={`fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'}`} id="signin-modal">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Sign In</h2>
                <form onSubmit={handleSignup}>
                    <Input
                        name={"username"}
                        id="username"
                        type="input"
                        label="User Name"
                        placeholder="Enter your username"
                        value={username}
                        onChange={setUsername}
                    />
                    {usernameError && <div className="text-red-500 mt-1">{usernameError}</div>}
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        value={email}
                        onChange={setEmail}
                    />
                    {emailError && <div className="text-red-500 mt-1">{emailError}</div>}
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                    />
                    {passwordError && <div className="text-red-500 mt-1">{passwordError}</div>}
                    <Input
                        name="description"
                        id="description"
                        type="input"
                        label="Description"
                        placeholder="Tell about yourself"
                        value={description}
                        onChange={setDescription}
                    />
                    <SearchBar
                        name='selectedTags'
                        tagsDatabase={tagsDatabase}
                        label='Games'
                        onTagsSelected={handleTags} // Pass the callback function
                    />
                    <div className="flex justify-start">
                        <ModalButton
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
                            btnType='submit'
                        >
                            Submit
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

export default SignupModal;
