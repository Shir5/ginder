'use server';
import { PrismaClient, Tag } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const signup = async (formData: FormData, selectedTags: Tag[]) => {
    try {
        // Extract form fields from formData
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const description = formData.get('description') as string;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save the extracted form data to the database using Prisma
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword, // Save hashed password
                description,
                selectedTags: {
                    connect: selectedTags.map(tag => ({ id: tag.id })) // Connect the user to the selected tags
                },
            }
        });

        console.log('User created:', user);

    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};
