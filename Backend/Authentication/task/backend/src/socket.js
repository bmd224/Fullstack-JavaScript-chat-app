import { messageService } from './data/dataServices.js';
import { authenticateSocket } from './middleware/auth.js';

export const initializeSocketIO = (io) => {

    // Apply authentication middleware for all socket connections
    io.use(authenticateSocket);

    // Setup handlers for a new socket connection
    io.on('connection', (socket) => {
        console.log('User connected:', socket.username);

        // Handle new messages
        socket.on('message', async (data) => {
            try {
                // Use the username from the authenticated socket
                const username = socket.username;
                const { content } = data;

                // Add a new message to the message service
                const message = await messageService.addMessage(username, content);

                // Broadcast the message to all connected clients
                io.emit('message', message);
            } catch (error) {
                socket.emit('error', { message: 'Error sending message' });
            }
        });

        // Handle message deletion
        socket.on('deleteMessage', async (data) => {
            try {
                const { messageId } = data;

                // Delete the message using the message service
                const deleted = await messageService.deleteMessage(messageId);

                // Trigger an 'error' event if the message was not found
                if (!deleted) {
                    socket.emit('error', { message: 'Message not found' });
                    return;
                }

                // Broadcast the 'messageDeleted' event with messageId to all connected clients
                io.emit('messageDeleted', { messageId });
            } catch (error) {
                socket.emit('error', { message: 'Error deleting message' });
            }
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.username);
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
