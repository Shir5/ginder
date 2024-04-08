import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LoginResponse {
    success: boolean;
    message?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // If user is not found, return failure response
        if (!user) {
            return { success: false, message: 'User not found.' };
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return failure response
        if (!passwordMatch) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // Return success response
        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
};
