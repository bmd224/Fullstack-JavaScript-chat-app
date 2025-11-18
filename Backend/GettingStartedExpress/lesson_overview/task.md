We're continuing our journey as beginner web developers.  

In this lesson, you will learn how to:  
- Use **Express.js** in your applications and understand why it's such a valuable tool.
- Handle requests with arguments and make your backend more interactive.
- Run an already-built frontend alongside your backend for a better experience.


### Why do we need Express.js?
In the previous lesson, while adding support for the `/sum` route, we noticed that although it wasn't particularly hard, the process was cumbersome.  
For example, if you were to support five similar routes the same way, your code would quickly become messy—filled with a long chain of `if-else` statements in a single file. 
That's why this approach isn't used in real-world projects.  

<div style="text-align: center; max-width:200px; margin: 0 auto; ">
<img src="images/express.svg">
</div>

A fast and easy way to streamline your work in Node.js is _[Express.js](https://expressjs.com/)_.
Express.js is a framework designed to simplify the process of building web servers and APIs.
It provides tools and features to handle HTTP routes, middleware, request/response handling, and more.
With Express.js, you can quickly create robust web applications while avoiding unnecessary boilerplate code.

### Backend folder
You may have noticed that a **backend** directory has appeared in your project structure. 
This will come in handy at the end of this lesson.