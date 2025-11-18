If you haven’t completed the first part of the course, you can quickly catch up by reviewing the theory only or by referring to the brief API summary below.

For more detailed information, you can check the file [api.md](course://Frontend/Introduction/backend_connection/api.md). 
But don't worry — you don't need to fully understand everything right now.

### REST API endpoints

#### Authentication
- `POST /api/auth/register`: Creates a new user account. Requires username and password in the request body. Returns a JWT token and the username.
- `POST /api/auth/login`: Authenticates an existing user. Requires username and password in the request body. Returns a JWT token and the username.

#### Messages
- `GET /api/messages`: Retrieves all messages. Authentication required.
- `POST /api/messages`: Creates a new message. Authentication required. Requires content in the request body.
- `DELETE /api/messages/:id`: Deletes a message by ID. Authentication required.


### Socket.IO events

#### Client to server
- `message`: Sends a new message. Requires content in the data object.
- `deleteMessage`: Deletes a message. Requires `messageId` in the data object.

#### Server to client
- `message`: Broadcasts a new message to all connected clients.
- `messageDeleted`: Notifies all clients when a message is deleted.
- `error`: Sends error messages to clients.

### Authentication
- JWT authentication is required for protected routes.
- Include the token as `Bearer <token>` in the Authorization header for HTTP requests.
- For Socket.IO connections, include the token in the handshake auth object: `{ auth: { token: "<token>" } }`.
