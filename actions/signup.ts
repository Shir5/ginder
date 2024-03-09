import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const signup = async (formData: FormData) => {
    try {
        // Extract form fields from formData
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const description = formData.get('description') as string;

        // Extract selected tags from formData and parse them
        const selectedTags = formData.get('selectedTags') as unknown as string[];

        // Save the extracted form data to the database using Prisma
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password, // Note: You should encrypt the password before saving it in the database
                description,
                selectedTags // Save the selected tags to the database
            }
        });

        console.log('User created:', user);

    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};
