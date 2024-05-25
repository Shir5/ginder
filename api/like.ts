"use server"

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function like(userId: number, likedUserId: number) {
    try {
        // Check if a like record already exists for the given combination
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: userId,
                likedUserId: likedUserId,
            },
        });

        const mutualLike = await prisma.like.findFirst({
            where: {
                userId: likedUserId,
                likedUserId: userId,
            },
        });

        if (existingLike) {
            console.log('Like already exists for this user');
            return mutualLike ? true : false;
        } else {
            // Create a new like record if it doesn't exist
            await prisma.like.create({
                data: {
                    userId: userId,
                    likedUserId: likedUserId,
                },
            });

            console.log('Like created successfully');
            return mutualLike ? true : false;

        }
    } catch (error) {
        console.error('Error creating like:', error);
        // Handle the error appropriately
        throw error; // Rethrow the error or handle it in the caller
    }
}
