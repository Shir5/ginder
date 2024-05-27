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

// In-memory store for unmatched notifications
const unmatchedNotifications: { [key: number]: any[] } = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', async (userId: number) => {
        const userIdStr = userId.toString();
        socket.join(userIdStr);
        console.log(`User with ID ${userId} joined room ${userId}`);

        // Check and send any unmatched notifications
        if (unmatchedNotifications[userId]) {
            unmatchedNotifications[userId].forEach((notification) => {
                socket.emit('matches', notification);
            });
            delete unmatchedNotifications[userId];
        }

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
                const matchedUserIdStr = matchedUserId.toString();
                // Notify both users about the match
                io.to(userIdStr).emit('matches', match.user);
                io.to(matchedUserIdStr).emit('matches', match.user);

                // Store notification if user is not connected
                if (!io.sockets.adapter.rooms.has(matchedUserIdStr)) {
                    if (!unmatchedNotifications[matchedUserId]) {
                        unmatchedNotifications[matchedUserId] = [];
                    }
                    unmatchedNotifications[matchedUserId].push(match.user);
                }
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
