In this lesson, you will learn how to:
- Create an application with multiple pages and routing between them.
- Implement this routing based on the internal state.

### What's routing for?
In our application, we need at least three different views: a login page, a registration page, and, of course, a chat page.
A logged-in user should go straight to the chat view instead of the login page.
Similarly, if an unauthenticated user tries to access the chat, they should be redirected to the login page.

_Routing_ allows you to manage these transitions based on user interaction and authentication state.
It also enables you to create [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application) (SPAs)
where users can access different sections without reloading the entire page.

### CSS
In the code examples, we will use different CSS styles to make our application look nice.
For this purpose, we will update the `frontend/src/index.css` file from task to task.
If you want to understand how a particular visual effect was achieved,
please refer to this file.
