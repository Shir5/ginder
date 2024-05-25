"use server"

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function matchCheck(userId: number, likedUserId: number) {
    try {
        // Check if a like record already exists for the given combination
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: userId,
                likedUserId: likedUserId
            },
        });
        if (existingLike) {
            const mutualLike = await prisma.like.findFirst({
                where: {
                    userId: userId,
                    likedUserId: likedUserId
                }
            })
            return mutualLike ? true : false;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Error checking like:', error);
    }
}

