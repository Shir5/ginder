import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves user data from the database based on the provided user ID.
 *
 * @param {number} userId - The ID of the user.
 * @return {Promise<User | null>} A Promise that resolves to the user data if found, or null if not found.
 * @throws {Error} If there was an error fetching the user data.
 */
export const getUserData = async (userId: number): Promise<User | null> => {
    try {
        // Find user by ID
        const user = await prisma.user.findUnique({
            where: {
                userId: userId,
            },
        });
        
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
    }
};