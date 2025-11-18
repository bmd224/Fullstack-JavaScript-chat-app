Before we write the Dockerfile for the backend, we have made a few changes
to the project to simplify our work later on. Please review them below:

### Backend changes
- The `database.sqlite` file has been moved from the backend root directory to the `backend/data` directory.
- The `storage` path has been updated in the [dbConfig.js][dbConfig] file.
- A `/health` route has been added to the [index.js][index] file.
- The `.env` file has been moved outside of the backend directory.

### Dockerfile
Now it's time to create a Dockerfile in the project directory. 
A Dockerfile is essentially a set of instructions for building an image, 
which is a blueprint for our container to run from.
Let's go over the backend [Dockerfile][Dockerfile] line by line:

```Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8000

CMD ["npm", "start"]
```

- The line `FROM node:20-alpine` uses the Node.js 20 image from [Docker Hub](https://hub.docker.com/_/node/) as the base image. This ensures that the container includes Node.js and all its dependencies.
- Using `WORKDIR /app` ensures that subsequent commands execute in that directory.
- The instruction `COPY package*.json ./` makes the file available in the Docker image.
- Then, we install dependencies using `RUN npm install`.
- The `COPY . .` instruction copies the rest of the source code into a subdirectory.
- The `EXPOSE 8000` instruction informs Docker that the container listens on port `8000` at runtime. We specified this port in [index.js][index]. Note: The `EXPOSE` instruction doesn't publish the port to the host machine; it simply declares that this port is intended to be used.
- Finally, the `CMD ["npm", "start"]` instruction specifies the command to run the application.

We will run the backend container later, after making updates to the frontend.

[dbConfig]: course://Deploy/Containerization/backend_dockerfile/backend/src/data/dbConfig.js
[index]: course://Deploy/Containerization/backend_dockerfile/backend/src/index.js
[Dockerfile]: course://Deploy/Containerization/backend_dockerfile/backend/Dockerfile
