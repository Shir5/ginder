import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust this based on your setup
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', async (userId: number) => {
        socket.join(userId.toString()); // Convert userId to string
        console.log(`User with ID ${userId} joined room ${userId}`);

        const checkForMatches = async () => {
            const likedUsers = await prisma.like.findMany({
                where: { userId },
                select: { likedUserId: true },
            });

            const likedUserIds = likedUsers.map((like) => like.likedUserId);

            const matches = await prisma.like.findMany({
                where: {
                    likedUserId: userId,
                    userId: { in: likedUserIds },
                },
                select: { user: true },
            });

            matches.forEach((match) => {
                const matchedUserId = match.user.userId;
                // Notify both users about the match
                io.to(userId.toString()).emit('matches', match.user); // Convert userId to string
                io.to(matchedUserId.toString()).emit('matches', match.user); // Convert matchedUserId to string
            });
        };

        checkForMatches();
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
