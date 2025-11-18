import express from 'express';
import { messageService } from '../data/dataServices.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
    try {
        // Get messages from the message service
        const messages = await messageService.getMessages();

        // Send them as a JSON response
        return res.json(messages);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Create a new message
router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        // Get the content field from the request body
        const content = req.body.content;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        // Check the content parameter
        if (!content) {
            return res.status(400).json({ message: 'Message content is required' });
        }

        // Add a message to the message service
        const message = await messageService.addMessage(username, content);

        // Respond with the 201 status code and the created message as the content
        return res.status(201).json(message);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating message' });
    }
});

// Optional task
// Delete a message
router.delete('/:id', async (req, res) => {
    try {
        // Get the message id from route params
        const { id } = req.params;

        // Delete the message using message service
        const deleted = await messageService.deleteMessage(id);

        // Respond with the 204 code on success, or 404 with an error message otherwise.
        if (!deleted) {
            return res.status(404).json({ message: 'Message not found' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting message' });
    }
});

export default router;
