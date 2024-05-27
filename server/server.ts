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

    socket.on('join', async (userId) => {
        socket.join(userId);
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

            if (matches.length > 0) {
                socket.emit('matches', matches.map(match => match.user));
            }
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
