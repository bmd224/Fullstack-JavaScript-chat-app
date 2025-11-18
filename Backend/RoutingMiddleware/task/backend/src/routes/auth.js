import express from 'express';
import bcrypt from 'bcryptjs';
import { userService } from '../data/dataServices.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        // Get the username and password from the request body
        const { username, password } = req.body;

        // Validate that both fields are provided
        if (!username || !password) {
            // Respond with the 400 status code and an error message
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user via the user service
        const user = await userService.createUser(username, hashedPassword);

        // Respond with the 201 status code and the username as the response body
        return res.status(201).json({ username: user.username });
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
        // Get the username and password from the request body
        const { username, password } = req.body;

        // Validate that both fields are provided
        if (!username || !password) {
            // Respond with the 400 status code and an error message
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        }

        // Get the user from the user service
        const user = await userService.getUser(username);

        // If user is not found, respond with 401
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });
        }

        // Compare the plain password with the stored hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);

        // If password does not match, respond with 401
        if (!isValidPassword) {
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });
        }

        // If authentication succeeds, respond with 200 and the username
        return res.status(200).json({ username: user.username });
    } catch (error) {
        return res.status(500).json({ message: 'Error during login' });
    }
});

export default router;
