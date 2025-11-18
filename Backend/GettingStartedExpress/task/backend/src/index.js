import express from 'express';
import http from 'http';

const app = express();

app.get('/', (req, res) => {
    res.status(200).type('text/plain').send('Hello, World!');
});

// Implement /sum route handler here
app.get('/sum', (req, res) => {
    const { a, b } = req.query;

    // Check that both parameters exist
    if (a === undefined || b === undefined) {
        return res.status(400).json({
            message: 'Invalid query parameters. Ensure "a" and "b" are numbers.'
        });
    }

    const parsedA = Number(a);
    const parsedB = Number(b);

    // Validate parameters
    if (Number.isNaN(parsedA) || Number.isNaN(parsedB)) {
        return res.status(400).json({
            message: 'Invalid query parameters. Ensure "a" and "b" are numbers.'
        });
    }

    const sum = parsedA + parsedB;

    return res.json({ sum });
});


app.get('/echo', (req, res) => {
    const message = req.query.message;

    if (message) {
        res.json({message});
    } else {
        res.status(400).json({message: 'No message provided'});
    }
})

app.use((req, res) => {
    res.status(404).type('text/plain').send('Page Not Found');
});

const PORT = 8000;
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

export { httpServer };
