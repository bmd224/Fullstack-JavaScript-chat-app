import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(morgan('tiny'));

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
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

export { httpServer, app };
