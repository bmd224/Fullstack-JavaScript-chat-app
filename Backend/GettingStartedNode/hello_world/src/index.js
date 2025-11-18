import {createServer} from 'http';

const httpServer = createServer((req, res) => {
    // Requests handler function
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello, World!');
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page Not Found');
    }
});

const PORT = 8000;
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

// This line does not make any sense yet, but it will be important when testing your project soon.
// Do not delete such lines in the future.
export {httpServer};
