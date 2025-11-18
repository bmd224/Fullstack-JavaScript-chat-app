Before updating the chat page, let's fix a small issue you might have noticed: 
when the browser page refreshes, our app redirects back to the login page, 
even if the user is already logged in.

This happens because the `isAuthenticated` variable in `App` is always initialized to `false`, 
even though a token might already be saved in `localStorage`.

To fix this, we will use the React hook `useEffect`. By default, it runs after the component renders or re-renders. 
This is a great place to check for the token when the page loads.

We'll also need to make a small update to the behavior of the logout button on the chat page to delete the token.

### Task

1. Look at the [_App.jsx_][App] file.  
   Depending on whether the token is stored in `localStorage` or not,
   set the `isAuthenticated` variable to `true` or `false`, respectively.
2. Next, open the [_Chat.jsx_][Chat] file.  
   Update `handleLogout` so that it not only calls the `onLogout` method but also deletes the token from `localStorage`:
    ```jsx
    localStorage.removeItem('token');
    ```

<div class="hint" title="Retrieving the token">

  You can get the token from `localStorage` as you did in the previous task:
  ```jsx
    localStorage.getItem('token');
  ```
</div>

### Check yourself
As always, use the tests in the `frontend/__tests__/token_test.jsx` file to better understand the task and verify your work.

Next, run the whole application and try to register and refresh the page!

<div style="text-align: center; max-width: 600px; margin: 0 auto;">
<img src="images/refresh.gif" alt="Refresh the page">
</div>

[App]: course://Frontend/BackendConnection/routing_update/frontend/src/App.jsx
[Chat]: course://Frontend/BackendConnection/routing_update/frontend/src/pages/Chat.jsx
