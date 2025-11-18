It seemed we finished route authentication, but we still have sockets!

Although we're using JWT authorization for sockets, we cannot reuse the `authenticateRoute` function.
So, let's add socket auth middleware in a similar way.

### Task
To add authentication for sockets, we need to make the following changes.

#### Socket auth middleware
Take a look at the `authenticateSocket` function in the `backend/src/middleware/auth.js` file.
This function works the same way as `authenticateRoute` does for routes.

1. First, we need to retrieve the token. It is stored in `socket.handshake.auth.token`.
2. Next, retrieve the payload just like we did in `authenticateRoute`.
3. Then, try to find the user in the user service.
4. Finally, if the user is found, save the username in the `socket.username` field.

#### Update socket handlers
1. In the `backend/src/socket.js` file, use the username from `socket` (added by the socket auth middleware after successful authentication) instead of fetching it from `data` when adding a message.
2. In the same file, add the `authenticateSocket` middleware for all clients: `io.use(authenticateSocket)`.

### Check yourself
As always, use the updated tests in the `backend/__tests__/socket.test.js` file to better understand the task and verify your work. 
You can also test with the frontend.

<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/sockets_auth.gif" alt="Sockets with auth">
</div>

This time, when you run the frontend, you will see a `WebSocket connection error` for WebSocket widgets.
This is expected because the client does not have a token until it logs in, so the connection cannot be established.
After logging in, click the `Reconnect` button.
