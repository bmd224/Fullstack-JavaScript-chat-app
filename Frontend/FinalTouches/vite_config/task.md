When developing the frontend, we didn't discuss exactly how it knows where to reach the backend.

Let's take a look at the [frontend/vite.config.js][ViteConf] file.
In this file, we specify the port where we want to run the frontend and where requests like 
`axios.post('/api/auth/login', formData);` made by the frontend should be directed.

We intentionally developed the frontend in a way that does not use the full backend address anywhere in the code.
This setup allows you to manage configurations flexibly within a single file.
In our case, it's quite simple: all requests starting with `'/api'` are directed to our locally running backend.

When we created a WebSocket:
```jsx
const newSocket = io('/', { ... });
```
Socket.IO automatically used its built-in WebSocket communication route (`'/socket.io'`).
That's why `vite.config.js` specifies that all requests starting with `'/socket.io'` 
for WebSockets (`ws: true`) should also be directed to our locally running backend.

With this approach, you can connect a specific frontend to a specific backend by editing just one file.
Read more about configuring Vite [here](https://vite.dev/config/).

[ViteConf]: course://Frontend/FinalTouches/vite_config/frontend/vite.config.js
