import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

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