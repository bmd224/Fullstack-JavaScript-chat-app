Great, the registration form is done! Let's move on to the login form.

To do this, we need to make the same changes in the [_Login.jsx_][Login] file.

### Task
1. Add `onChange` event handlers for the `username` and `password` fields.
2. Make a POST request to the `'/api/auth/login'` route with the username and password to get the token.
3. Save the token in `localStorage` with the key `'token'`.


### Check yourself
You can use the tests in the `frontend/__tests__/login_test.jsx` file to better understand the task and verify your work.
When running tests, note how you can print the current HTML page: 

```jsx
console.log(container.innerHTML)
```

This can be useful for debugging.

Once all tests pass, run the entire application and try to register and log in!

<div style="text-align: center; max-width: 600px; margin: 0 auto;">
<img src="images/login.gif" alt="Login">
</div>

[Login]: course://Frontend/BackendConnection/login_form/frontend/src/pages/Login.jsx
