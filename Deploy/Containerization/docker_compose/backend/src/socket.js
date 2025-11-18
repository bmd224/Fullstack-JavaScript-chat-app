import { messageService } from './data/dataServices.js';
import {authenticateSocket} from "./middleware/auth.js";

export const initializeSocketIO = (io) => {

    io.use(authenticateSocket);

    // Setup handlers for a new socket connection
    io.on('connection', (socket) => {
        console.log('User connected');

        // Handle new messages
        socket.on('message', async (data) => {
            try {
                const message = await messageService.addMessage(socket.username, data.content);

                io.emit('message', message);
            } catch (error) {
                socket.emit('error', { message: 'Error sending message' });
            }
        });

        // Handle message deletion
        socket.on('deleteMessage', async (data) => {
            try {
                const deleted = await messageService.deleteMessage(data.messageId);

                if (!deleted) {
                    socket.emit('error', { message: 'Message not found' });
                    return;
                }

                io.emit('messageDeleted', { messageId: data.messageId });
            } catch (error) {
                socket.emit('error', { message: 'Error deleting message' });
            }
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });

    // Handle server-side errors
    io.on('error', (error) => {
        console.error('Socket.IO error:', error);
    });
};