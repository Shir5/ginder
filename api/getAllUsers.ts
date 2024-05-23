"use server";
import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Function to fetch all users from the database
export default async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            include: {
                selectedTags: true // Include associated tags for each user
            }
        });
        return users;
    } catch (error : any) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

