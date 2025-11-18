import { messageService } from './data/dataServices.js';

export const initializeSocketIO = (io) => {

    // Setup handlers for a new socket connection
    io.on('connection', (socket) => {
        console.log('User connected');

        // Handle new messages
        socket.on('message', async (data) => {
            try {
                // Extract username and content from the incoming data payload
                const { username, content } = data;

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
                // Extract the messageId from the incoming data payload
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
            console.log('User disconnected');
        });

        // Handle errors for the current socket
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });

    // Handle server-side Socket.IO errors
    io.on('error', (error) => {
        console.error('Socket.IO error:', error);
    });
};
