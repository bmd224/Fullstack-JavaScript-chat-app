import express from 'express';
import bcrypt from 'bcryptjs';
import { userService } from '../data/dataServices.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userService.createUser(username, hashedPassword);

        return res.status(201).json({ username: user.username });
    } catch (error) {
        if (error.message === 'Username already exists') {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error creating user: ' + error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await userService.getUser(username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        return res.json({username: user.username });
    } catch (error) {
        return res.status(500).json({ message: 'Error during login' });
    }
});

export default router;