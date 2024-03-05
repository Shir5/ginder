
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, email, password, description, selectedTags } = req.body;

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user data to the database using Prisma
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    description,
                    selectedTags,
                },
            });

            res.status(200).json({ message: 'User signed in successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error signing in user', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}           