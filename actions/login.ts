import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { setCookie, parseCookies } from 'nookies';

const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                return res.status(401).json({ message: 'User not found.' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            // After successful login, set the authentication token in a cookie
            if (user && user.token) {
                setCookie({ res }, 'token', user.token, {
                    maxAge: 30 * 24 * 60 * 60, // 30 days
                    path: '/',
                });
            } else {
                throw new Error('Invalid username or password');
            }

            return res.status(200).json({ message: 'Login successful.' });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'An unexpected error occurred. Please try again.' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}
