"use server"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function like(userId: number, likedUserId: number) {
    try {
        // Check if a like record already exists for the given combination
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: userId,
                likedUserId: likedUserId,
            },
        });

        if (existingLike) {
            console.log('Like already exists for this user');
            // Handle the case when a like already exists
            return; // Do nothing or return an appropriate response
        }

        // Create a new like record if it doesn't exist
        await prisma.like.create({
            data: {
                userId: userId,
                likedUserId: likedUserId,
            },
        });

        console.log('Like created successfully');
    } catch (error) {
        console.error('Error creating like:', error);
        // Handle the error appropriately
        throw error; // Rethrow the error or handle it in the caller
    }
}

export default like;
