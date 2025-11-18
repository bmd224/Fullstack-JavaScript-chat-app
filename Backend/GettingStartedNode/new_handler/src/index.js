import {createServer} from 'http';

const httpServer = createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello, World!');
    } else if (req.url === '/sum') {
        res.writeHead(501, { 'Content-Type': 'text/plain' });
        res.end('TODO in the next lesson');
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page Not Found');
    }
});

const PORT = 8000;
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

export {httpServer};
