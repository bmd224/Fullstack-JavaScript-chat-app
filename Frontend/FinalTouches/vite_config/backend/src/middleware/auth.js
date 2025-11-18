import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userService } from '../data/dataServices.js';

dotenv.config();
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables.');
    process.exit(1);
}

export const generateToken = (username) => {
    return jwt.sign({ username }, JWT_SECRET);
};

export const authenticateRoute = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Typically, the `authorization` header has the format `"Bearer <token>"`
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userService.getUser(decoded.username);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.username = decoded.username;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const authenticateSocket = async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication token required'));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userService.getUser(decoded.username);

        if (!user) {
            return next(new Error('User not found'));
        }

        socket.username = decoded.username;
        next();
    } catch (err) {
        next(new Error('Invalid token'));
    }
};