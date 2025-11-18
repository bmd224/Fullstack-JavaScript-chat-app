Before we write the Dockerfile for the frontend, we have made a few changes
to the project to simplify our work later on. Please review them below.

### Frontend changes
- Images (`academy.svg` and `delete.svg`) were moved to the `public/assets` folder.
  This is the default resources folder used by a Vite project.
- Paths to the images in the [Chat.jsx][Chat] and [index.html][index] files were updated.
- A `build` script was added to the [package.json][package] file.
- Updates were made to [vite.config.js][vite.config] to retrieve `backendUrl` from the environment variables.
- A new [nginx.conf][nginx] file was created. This is the default configuration file for Nginx, where changes were made, such as specifying the frontend port and backend URLs.

The built-in Vite web server is not designed for production use.
However, it can be used to build the project, which can then be hosted on
a full-featured web server like [Nginx](https://nginx.org/).

You can read more about Nginx configuration in the [official documentation](https://nginx.org/en/docs/beginners_guide.html#conf_structure). 

### Dockerfile
The frontend [Dockerfile][Dockerfile] is slightly more complex than the backend one because it includes two stages:

```dockerfile
# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
```

- The build stage is similar to the backend process, but its build artifacts are used in the next stage.
- For the production stage, we use `nginx:alpine`, a base image with Nginx already installed.
- Then, we copy the built frontend from the build stage into the Nginx directory: `COPY --from=build /app/dist /usr/share/nginx/html`.
- Next, we copy the configuration file into the image: `COPY nginx.conf /etc/nginx/conf.d/default.conf`.
- Finally, we specify that the container will listen on port `3000` at runtime.

You may have noticed that in [nginx.conf][nginx], URLs such as `http://backend:8000/api/` are used without explicitly defining what "backend" refers to.
In the next task, we’ll explain why this works and how to run both the backend and frontend together.

[Chat]: course://Deploy/Containerization/frontend_dockerfile/frontend/src/pages/Chat.jsx
[index]: course://Deploy/Containerization/frontend_dockerfile/frontend/index.html
[package]: course://Deploy/Containerization/frontend_dockerfile/frontend/package.json
[vite.config]: course://Deploy/Containerization/frontend_dockerfile/frontend/vite.config.js
[nginx]: course://Deploy/Containerization/frontend_dockerfile/frontend/nginx.conf
[Dockerfile]: course://Deploy/Containerization/frontend_dockerfile/frontend/Dockerfile
