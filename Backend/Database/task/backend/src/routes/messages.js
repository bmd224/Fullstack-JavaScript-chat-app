import express from 'express';
import { messageService } from '../data/dataServices.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await messageService.getMessages();
        return res.json(messages);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Create a new message
router.post('/', async (req, res) => {
    try {
        /**/
        const content = req.body.content;

        /**/

        if (!content) {
            return res.status(400).json({ message: 'Message content is required' });
        }

        const message = await messageService.addMessage(req.username, content);
        return res.status(201).json(message);

    } catch (error) {
        return res.status(500).json({ message: 'Error creating message' });
    }
});

// Optional task
// Delete a message
router.delete('/:id', async (req, res) => {
    try {
        const messageId = req.params.id;
        // Now messageId should be converted to the number
        const deleted = await messageService.deleteMessage(Number(messageId));

        if (!deleted) {
            return res.status(404).json({ message: 'Message not found' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting message' });
    }
});

export default router;