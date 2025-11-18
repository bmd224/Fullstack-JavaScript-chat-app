Processing a request on the server is usually a chain of actions, including
parsing request bodies, handling authentication/authorization, logging requests/responses, error handling, and more.

These functions, which run during the lifecycle of a request to a server in Express.js, are called middleware.
You've already seen them before: 

```js
app.use((req, res) => {
    res.status(404).type('text/plain').send('Page Not Found');
});
```

Middleware functions are executed in the order they are defined in the code. 
Middleware can either be global (applied to all routes) or specific (applied to certain routes only).


Typically, a middleware function takes three parameters:
```js
function (req, res, next) { ... }
```
The `next` argument is a function used to pass control to the next middleware in the stack.
If `next()` is not called, the request-processing cycle will terminate.
However, sometimes this is intentional. For example, no further action is required when we send a `Page Not Found` response. 

You can add different middleware to your application as constructors, but keep the following points in mind:
- The order in which middleware is declared in the code determines the order in which it is executed. 
- Use Express's built-in or third-party middleware to simplify common tasks.
- Avoid overusing middleware: excessive middleware can slow down your application.

### Built-in middleware examples
Take a look at the `backend/src/index.js`. We've added some useful built-in middleware to our project:
- `app.use(cors());` – Cross-Origin Resource Sharing (CORS) enables the server to handle requests from another domain. 
  For example, when the frontend is deployed separately from the backend.
- `app.use(express.json());` – parses incoming JSON bodies in requests and makes them accessible via `req.body`.
  Without it, we would need to manually handle and parse the received data in future tasks.

### Error-handling middleware
Express also provides special middleware for error-handling, defined with four parameters. You can find it in `index.js`:

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
```

This makes it easier to handle any errors that occur while processing other queries.
Launch the application and try using the `/echo` route: http://localhost:8000/echo.

We intentionally broke it by leaving only the line `throw new Error('Error');` in its handler — for the sake of clarity.

### Logging
Another task where middleware comes in handy is logging!
For debugging purposes, it's especially useful to see which requests were sent to which routes.

This can be done by adding middleware at the beginning, with the handler printing the time, request type (GET, POST, etc.), and URL:

```js
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to ${req.url}. Re`);
    next();
});
```

Alternatively, the same can be achieved with the [morgan](https://expressjs.com/en/resources/middleware/morgan.html) middleware in just one line: 

```js
app.use(morgan('tiny'));
```

Here, `'tiny'` configures the logging to be as concise as possible, but morgan allows you to customize the output to your needs.

