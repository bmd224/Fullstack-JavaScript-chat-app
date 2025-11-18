import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from "morgan";
import messageRoutes from './routes/messages.js';
import authRoutes from './routes/auth.js';
import { Server as SocketIO } from 'socket.io';
import { initializeSocketIO } from './socket.js';
import { authenticateRoute } from './middleware/auth.js';

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIO(httpServer);
initializeSocketIO(io);

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(morgan('tiny'));

// Adding message router
app.use('/api/messages', authenticateRoute, messageRoutes);
//app.use('/api/messages', messageRoutes);

// Adding auth router
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).type('text/plain').send('Hello, World!');
});

app.use((req, res) => {
    res.status(404).type('text/plain').send('Page Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 8000;

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

export { httpServer, app };
