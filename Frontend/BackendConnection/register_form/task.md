Let's start implementing the pages with the registration form in the [_Register.jsx_][Register] file.

We need to make a lot of small changes, so we'll do it step by step. 
Some changes will be made by us, and some will be your task.

---

### Error handling
To allow users to see an error message, we add an `error` variable and a block to display it:

```jsx
{error && <div className="error">{error}</div>}
```
This code displays the `<div>` only when `error` is not empty.

---
### Handling field changes
Next, we need to handle changes in the `username`, `password`, and `confirmPassword` fields.
Since they belong to the same form, we will store their data in one `formData` object, so they will share a common handler.
In the `handleChange` function, we can get the updated field's data from the `e.target` properties.
Setters from `useState` can also accept a function where the argument is the current variable value.
This allows us to update only the changed field while keeping the other fields intact:

```jsx
    setFormData(prev => ({
    ...prev,
    [name]: value
}));
```
Now, add `handleChange` as a handler for the `onChange` action for the username form field.

---
### Submitting the form
Great, now `formData` always holds the latest data, which we can use to call the `'/api/auth/register'` route in our backend.
To make HTTP requests, we'll use the [axios](https://axios-http.com/docs/intro) library.

Take a look at the `handleSubmit` function.
First, we need to disable the default form submission behavior by the browser using `e.preventDefault();` and handle it manually.

Next, check if `password` and `confirmPassword` are the same. If they match, make a POST request with the `username` and `password`:

```jsx
const response = await axios.post('/api/auth/register', {
    username: formData.username,
    password: formData.password
});
```

If the request is successful, the token can be accessed as `response.data.token`.

---

### Saving the token
Now that we have the token, what should we do to make it available for other pages in our app?
We will save it using [localStorage](https://en.wikipedia.org/wiki/Web_storage) –
a standard JavaScript API provided by browsers to store persistent data on users' devices.


```jsx
localStorage.setItem('token', response.data.token);
```

You can think of `localStorage` as a JavaScript `Map` where the token is stored under the key `'token'`.

---

### Task
So, let's summarize what you need to do:
1. Add a handler for the `onChange` action for the `username` field in the form.
2. Check if `password` and `confirmPassword` are not equal.
3. Make a request to `'/api/auth/register'` as shown above.
4. Save the token in `localStorage` with the key `'token'`.

### Check yourself
You can use the tests in the `frontend/__tests__/register_test.jsx` file to better understand the task and verify your work.
Note that tests use [mock functions](https://jestjs.io/docs/mock-function-api).
This allows you to test the frontend separately from the backend.

Of course, once all tests have passed, you can run the whole application and check your solution manually.

<div style="text-align: center; max-width: 600px; margin: 0 auto;">
<img src="images/register.gif" alt="Register">
</div>

[Register]: course://Frontend/BackendConnection/register_form/frontend/src/pages/Register.jsx
