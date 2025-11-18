Before we start, let's briefly discuss a typical web app architecture.

A web application consists of two main parts:
- Frontend (Client-Side): The part users interact with, usually built with tools like _HTML, CSS, and JavaScript frameworks_ (e.g., React).
- Backend (Server-Side): Handles the app's logic and data management.
  It handles API requests, stores data in databases, and facilitates communication between the client and the server. It's often built with tools like _Node.js_ and _Express_.

For our chat app:
- The frontend will display messages and provide an interface for sending new messages.
- The backend will handle user authentication and enable real-time message communication. 

### Backend ↔ frontend communication

These two parts communicate through a **[RESTful](https://en.wikipedia.org/wiki/REST) API**, which facilitates the exchange of data between the server and the client.

A RESTful API is a way to communicate using standard HTTP methods (GET, POST, ...) where data is accessed through URLs (endpoints), 
and responses are typically in JSON format. It’s simple, stateless, and widely used for building web services.

In our app, the _frontend_ will use RESTful API **endpoints** offered by the _backend_ to send and receive data. For example:
- Frontend Request: A user sends a message through the frontend.
- Backend Response: The backend processes the message and broadcasts it to all users.

### Technology stack
In web development, you may often hear such a concept as _technology stack_. Some of the most popular stacks have well-known acronyms, such as MERN:
- **M**ongoDB is used as a database.
- **E**xpress.js is a framework for building RESTful APIs with Node.js.
- **R**eact is a front-end JavaScript library.
- **N**ode.js is a JavaScript runtime environment.

<div style="background-color: gray; text-align: center; width:50%; margin: 0 auto;">
<img src="images/mern.png">
</div>

This naming convention conveniently demonstrates which technologies are used for different parts of the project.
Moreover, if technologies are independent of each other, we can replace, for example, MongoDB with another database, 
or React with a different frontend framework.

In this course, we will pay little attention to the database layer. 
Therefore, we can say that we will be working with an **ERN-stack**.

### From the backend to the frontend
In the first half of this course, we'll focus on building the backend.
To simplify development and for convenient testing, an educational frontend will be provided for you. You are free to explore it! 

By the second half of the course, you’ll have a clear understanding of how the backend works, and then you'll be ready to dive into frontend development.

<style>
img {
  display: inline !important;
}
</style>
