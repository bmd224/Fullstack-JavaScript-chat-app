So far, we have been running our project locally, which has been sufficient for testing.

In this lesson, we’ll discuss how to adapt our application 
before deploying it to a server and making it accessible to users.

While you could manually copy the application to a server, install all dependencies,
and run it there, this approach is unreliable.
For example, migrating the application to a different hosting service might require significant time.

We can avoid these issues by deploying and running the application in a **Docker container**.

From this lesson, you will learn how to:
- Write a Dockerfile.
- Create a Docker Compose file for the project.
- Run your application in Docker containers with a single command.
