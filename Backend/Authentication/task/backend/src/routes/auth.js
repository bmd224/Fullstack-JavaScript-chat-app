import express from 'express';
import bcrypt from 'bcryptjs';
import { userService } from '../data/dataServices.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        // Get the username and password from the req.body
        const { username, password } = req.body;

        if (!username || !password) {
            // Respond with the 400 code and an error message
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await userService.createUser(username, hashedPassword);

        // Generate a JWT token for the new user
        const token = generateToken(user.username);

        // Respond with the 201 code and the token + username
        return res.status(201).json({ token, username: user.username });
    } catch (error) {
        if (error.message === 'Username already exists') {
            return res.status(409).json({ message: error.message });
        }
        return res
            .status(500)
            .json({ message: 'Error creating user: ' + error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        // Get the username and password from the req.body
        const { username, password } = req.body;

        if (!username || !password) {
            // Respond with the 400 code and an error message
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        }

        // Get the user from the user service
        const user = await userService.getUser(username);

        if (!user) {
            // Respond with the 401 code and an error message
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });
        }

        // Compare the passwords with bcrypt.compare
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            // Respond with the 401 code and an error message
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token for the authenticated user
        const token = generateToken(user.username);

        // Respond with the code 200 and the token + username
        return res.status(200).json({ token, username: user.username });
    } catch (error) {
        return res.status(500).json({ message: 'Error during login' });
    }
});

export default router;
