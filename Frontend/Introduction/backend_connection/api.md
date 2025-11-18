# Comprehensive Backend API Documentation

## Overview
This document provides a comprehensive guide to the backend API for the messaging application. 
The backend is built with Express.js and Socket.IO, providing both REST API endpoints and real-time socket events.

## Server information
- **Port**: 8000

## Authentication
The API uses JWT (JSON Web Token) for authentication.

### Token format
- For HTTP requests: Include the token in the Authorization header as `Bearer <token>`.
- For Socket.IO connections: Include the token in the handshake auth object as `{ auth: { token: "<token>" } }`.

## REST API endpoints

### Authentication

#### Register a new user
- **URL**: `/api/auth/register`
- **Method**: POST
- **Authentication**: Not required
- **Request body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "token": "string",
      "username": "string"
    }
    ```
- **Error responses**:
  - **Code**: 400 Bad Request
    - **Content**: `{ "message": "Username and password are required" }`
  - **Code**: 409 Conflict
    - **Content**: `{ "message": "Username already exists" }`
  - **Code**: 500 Internal Server Error
    - **Content**: `{ "message": "Error creating user: <error message>" }`

#### Login
- **URL**: `/api/auth/login`
- **Method**: POST
- **Authentication**: Not required
- **Request body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "token": "string",
      "username": "string"
    }
    ```
- **Error responses**:
  - **Code**: 400 Bad Request
    - **Content**: `{ "message": "Username and password are required" }`
  - **Code**: 401 Unauthorized
    - **Content**: `{ "message": "Invalid username or password" }`
  - **Code**: 500 Internal Server Error
    - **Content**: `{ "message": "Error during login" }`

### Messages

#### Get all messages
- **URL**: `/api/messages`
- **Method**: GET
- **Authentication**: Required
- **Success response**:
  - **Code**: 200 OK
  - **Content**: Array of message objects
    ```json
    [
      {
        "id": "number",
        "username": "string",
        "content": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
    ```
- **Error response**:
  - **Code**: 500 Internal Server Error
    - **Content**: `{ "message": "Error fetching messages" }`

#### Create a new message
- **URL**: `/api/messages`
- **Method**: POST
- **Authentication**: Required
- **Request body**:
  ```json
  {
    "content": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**: The created message object
    ```json
    {
      "id": "number",
      "username": "string",
      "content": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```
- **Error responses**:
  - **Code**: 400 Bad Request
    - **Content**: `{ "message": "Message content is required" }`
  - **Code**: 500 Internal Server Error
    - **Content**: `{ "message": "Error creating message" }`

#### Delete a message
- **URL**: `/api/messages/:id`
- **Method**: DELETE
- **Authentication**: Required
- **URL parameters**:
  - `id`: ID of the message to delete
- **Success response**:
  - **Code**: 204 No Content
- **Error responses**:
  - **Code**: 404 Not Found
    - **Content**: `{ "message": "Message not found" }`
  - **Code**: 500 Internal Server Error
    - **Content**: `{ "message": "Error deleting message" }`

### Other endpoints

#### Root endpoint
- **URL**: `/`
- **Method**: GET
- **Authentication**: Not required
- **Success Response**:
  - **Code**: 200 OK
  - **Content**: "Hello, World!"

#### Not found
- **URL**: Any undefined route
- **Method**: Any
- **Authentication**: Not required
- **Response**:
  - **Code**: 404 Not Found
  - **Content**: "Page Not Found"

## Socket.IO events

### Connection
- **Event**: `connection`
- **Authentication**: Required (via handshake auth token)
- **Description**: Triggered when a client connects to the server

### Client-to-server events

#### Send message
- **Event**: `message`
- **Authentication**: Required
- **Data**:
  ```json
  {
    "content": "string"
  }
  ```
- **Description**: Sends a new message

#### Delete message
- **Event**: `deleteMessage`
- **Authentication**: Required
- **Data**:
  ```json
  {
    "messageId": "number"
  }
  ```
- **Description**: Deletes a message by ID

#### Disconnect
- **Event**: `disconnect`
- **Authentication**: Required
- **Description**: Triggered when a client disconnects

#### Error
- **Event**: `error`
- **Authentication**: Required
- **Description**: Handles client-side errors

### Server-to-client events

#### New message
- **Event**: `message`
- **Data**: Message object
  ```json
  {
    "id": "number",
    "username": "string",
    "content": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Description**: Broadcasts a new message to all connected clients

#### Message deleted
- **Event**: `messageDeleted`
- **Data**:
  ```json
  {
    "messageId": "number"
  }
  ```
- **Description**: Notifies all clients when a message is deleted

#### Error
- **Event**: `error`
- **Data**:
  ```json
  {
    "message": "string"
  }
  ```
- **Description**: Sends error messages to clients

## Data models

### User
- **username**: string (primary key)
- **password**: string (hashed)

### Message
- **id**: number (primary key, auto-increment)
- **username**: string (foreign key to User)
- **content**: text
- **createdAt**: datetime
- **updatedAt**: datetime
