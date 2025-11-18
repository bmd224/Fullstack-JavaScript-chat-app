import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).type('text/plain').send('Hello, World!');
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ message: 'Invalid query parameters. Ensure "a" and "b" are numbers.' });
    }

    const sum = a + b;
    res.json({ sum });
});

app.get('/concat', (req, res) => {
    const str1 = req.query.str1;
    const str2 = req.query.str2;

    if (str1 === undefined || str2 === undefined) {
        return res.status(400).json({ message: 'Invalid query parameters. Ensure "str1" and "str2" are provided.' });
    }

    const result = str1 + str2;
    res.json({ result });
});

app.get('/echo', (req, res) => {
    throw new Error('Error');
})

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

export { httpServer };
