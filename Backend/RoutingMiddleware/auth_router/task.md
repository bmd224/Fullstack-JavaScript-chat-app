We’ve implemented routes for working with messages; now it’s time to focus on authentication.
Although we'll add authorization middleware for all routes later,
for now, let’s prepare by implementing the routes for user registration and login.

### Task
To complete the task, you will need to modify three things.

#### index.js
Before working on `backend/src/routes/auth.js`, update the `backend/src/index.js` file.

Add an authentication router to handle the `'/api/auth'` route. Import it from `'./routes/auth.js'`.  
This ensures that all requests to routes starting with `'/api/auth'` will be directed to the auth router.  
As a result, the complete URLs for registration and login in the app will be `'/api/auth/register'` and `'/api/auth/login'`.

#### Registration route
The purpose of this route is to add a new user to the user service. Follow these steps:
1. Retrieve the `username` and `password` parameters from `req.body`.
2. If either parameter is missing, return a JSON response `{ message: 'Username and password are required' }` with the `400` (Bad Request) status code.
3. Next, note the line that generates the hashed password. You can read more about the `bcrypt.hash` method on the [bcrypt package page](https://www.npmjs.com/package/bcrypt).
4. Create a new user using the `userService.createUser` method.
5. If the user is successfully created, return a JSON response `{ username: <username_value> }` with the status code `201`.

#### Login route
The purpose of this route is to verify that a user with the specified username and password is registered in our application.  
For now, this route will only indicate in the response whether such a user exists.  
Follow these steps:
1. Retrieve the `username` and `password` parameters from `req.body`.
2. If either parameter is missing, return a JSON response `{ message: 'Username and password are required' }` with the `400` (Bad Request) status code.
3. Retrieve the user by `username` using the user service.
4. If the user is not found, return a JSON response `{ message: 'Invalid username or password' }` with the `401` status code.
5. Compare the password from the request body with the hashed password from the user service for this user.  
   Use the `bcrypt.compare` method, which takes the plain-text password as the first argument and the hashed password as the second: `bcrypt.compare(plaintextPassword, hashedPassword)`.  
   It returns `true` if the passwords match.
6. If the passwords do not match, return a JSON response `{ message: 'Invalid username or password' }` with the `401` status code.
7. If the user is successfully authenticated, return a JSON response `{ username: <username_value> }` with the `200` status code.

#### Check yourself
As always, you have access to the public tests in the `backend/__test__/auth.test.js` file, as well as in the frontend, to test your routes.  
Use them to better understand the task and to verify that everything is working as expected.

<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/auth.gif">
</div>
