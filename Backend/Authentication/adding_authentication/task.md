Adding authentication is not a difficult process, but it involves making changes in several parts of the project. 
To keep things clear, we’ll handle it step by step:

1. We need to implement a method for generating a token as well as middleware to validate the token in user requests. Let's call this auth middleware.
   We previously discussed the [middleware concept](course://Backend/TestingDebugging/middleware_concept), and it's an excellent tool for user authorization.
2. Update the `'/login'` and `'/register'` routes to return a token to the user upon successful login or registration.
3. Add auth middleware for `'/api/messages'` requests.

The frontend adds a token to the headers of every request it sends, which the backend can use to authenticate the user.

### Task
#### Auth middleware
Take a look at the `backend/src/middleware/auth.js` file.
To generate a token, we need a secret key from the `.env` file.
The easiest way to access this key is by using the `dotenv` library.
It automatically loads environment variables from the `backend/.env` file and provides access to them via `process.env.ENV_NAME`.

1. Retrieve the `JWT_SECRET` environment variable and save it into a variable with the same name.
2. Since the secret key is critical for the app to work, check if this variable is missing. If it is, log an error message using `console.error` and
   terminate the backend with the `process.exit(1)` method. Write an appropriate error message yourself.
3. To generate a token in the `generateToken` function, use the `jwt.sign` method. Pass the payload
   (in our case, `{username}`) and `JWT_SECRET` as arguments. The `jwt.sign` method can also accept options,
   such as the token's expiration time, as a third parameter. You can learn more about it [here](https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback).
4. In the `authenticateRoute` method, retrieve the token from the request headers: `req.headers['authorization']`.
5. If the token is missing, terminate the request with a `401` status code and an error message (you can write your own).
6. Use the `jwt.verify(token, JWT_SECRET)` method to retrieve the payload from the token. You can
   learn more about it [here](https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback).
7. Then, use the `userService.getUser` method to check if the user exists in the system.
8. If the user does not exist, terminate the request with a `401` status code and an error message. Write your own error message for this.
9. If the user exists, save the username in the `req.username` property. We will use this later.
10. Finally, call the `next()` method so that the request can move forward to the next middleware or route handler in the processing chain.

#### Update auth router
Now, open the `backend/src/routes/auth.js` file.

Here we need to update the `'/login'` and `'/register'` routes so that they generate a token using the `generateToken` function and pass it to the client.  
The JSON response for successful registration or login will now look like this: `{ token: <token>, username: <username> }`.

#### Protect messages
We are almost done! Just one small step remains in the `backend/src/index.js` file.

Here, we need to add auth middleware to the `messageRoutes` router. It's simple — just pass `authenticateRoute` as the second argument to `app.use`.

### Check yourself
As always, you can use the updated tests in the `backend/__tests__/messages.test.js` file to verify your work.  
Additionally, test the functionality directly in the frontend. At this point, sending messages will only be possible after registering a new user or logging in.

<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/routes_auth.gif" alt="Routes with auth">
</div>
