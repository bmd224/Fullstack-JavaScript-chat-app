Now, only authorized users can send messages.
Each client sends us a token that encodes their username. However, we are still using the username from the request parameters.
This creates an extra field the client needs to send, and it also allows them to set another user's name.
Let's fix this!

### Task
In the auth middleware `backend/src/middleware/auth.js`, we saved the username from the token in the request: `req.username`.
Since the request passes to the route handlers after successful authentication, we can now safely use this field.

Update the POST request handler to use the username from the request (`req.username`) —
added earlier in the auth middleware — when adding a message.

Note that the frontend no longer needs the username field. We've already updated the `backend/__tests__/messages.test.js` file for this change.

<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/username_from_token.gif" alt="Getting username from the token">
</div>
