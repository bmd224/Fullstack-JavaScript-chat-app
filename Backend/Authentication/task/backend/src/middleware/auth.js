import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userService } from '../data/dataServices.js';

// Load environment variables from .env file
dotenv.config();

// Retrieve the JWT_SECRET environment variable
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    // Log message to help identify what went wrong
    console.error('JWT_SECRET is not defined. Please set it in backend/.env');
    // Terminate the app with `1` exit code
    process.exit(1);
}

// Generate a JWT token with `{ username }` payload
export const generateToken = (username) => {
    return jwt.sign({ username }, JWT_SECRET);
};

// HTTP route authentication middleware
export const authenticateRoute = async (req, res, next) => {
    // Get token from the authorization header
    const authHeader = req.headers['authorization'];

    // Typically, the `authorization` header has the format `"Bearer <token>"`
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // Respond with the 401 status code if token is missing
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        // Get a decoded payload using jwt.verify method
        const payload = jwt.verify(token, JWT_SECRET);

        // Get a user from the user service
        const user = await userService.getUser(payload.username);

        if (!user) {
            // Respond with the 401 status code if user is not found
            return res.status(401).json({ message: 'User not found' });
        }

        // Set the username property for the req so route handlers can use it
        req.username = payload.username;

        // Call `next` method to continue the middleware chain
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Socket.IO authentication middleware
export const authenticateSocket = async (socket, next) => {
    // Retrieve the token from the socket handshake auth data
    const token = socket.handshake?.auth?.token;

    if (!token) {
        return next(new Error('Authentication token required'));
    }

    try {
        // Get a decoded payload using jwt.verify method
        const payload = jwt.verify(token, JWT_SECRET);

        // Get a user from the user service
        const user = await userService.getUser(payload.username);

        if (!user) {
            return next(new Error('User not found'));
        }

        // Set the username property for the socket so handlers can use it
        socket.username = payload.username;

        // Continue with the connection
        return next();
    } catch (err) {
        return next(new Error('Invalid token'));
    }
};
