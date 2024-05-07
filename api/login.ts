'use server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'; // Import Prisma Client
import { encrypt, createSession } from '../lib/session'; // Import encryption and session management functions

const prisma = new PrismaClient();

/**
 * Retrieves a user from the database based on the provided identifier and password, then authenticates the user.
 *
 * @param {string} identifier - The username or email of the user.
 * @param {string} password - The password of the user for authentication.
 * @return {Promise<User>} The user object if authentication is successful.
 */
export async function login(identifier: string, password: string) {
    try {
        // Retrieve user from the database based on the provided identifier (username or email)
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: identifier },
                    { email: identifier },
                ],
            },
        });

        // If user not found, throw an error
        if (!user) {
            throw new Error('User not found');
        }

        // Compare the provided password with the hashed password stored in the user record
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, throw an error
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        // Create a session for the authenticated user
        await createSession(user.userId);
        // If everything is successful, return the user object
        return user;
    } catch (error: any) {
        // Handle any errors, such as user not found or invalid password
        throw new Error('Login failed: ' + error.message);
    }
}
