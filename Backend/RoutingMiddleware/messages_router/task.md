You can see the `backend/src/routes/messages.js` file, where the `router` has already been declared.
It includes several handlers for GET, POST, and DELETE requests, which need to be implemented to support the messages API.

Before working on this file, let's examine how this router is added to our application in `backend/src/index.js`.
There, you only need to import the router and add it using the familiar `app.use` method:
```js
app.use('/api/messages', messageRoutes);
```

Also note the URL `'/api/messages'`. 
This means our `messageRoutes` router will actually handle GET, POST, and DELETE requests for this route.

---

### Task

Complete the implementation of the message processing routes. Since `messageService` methods are asynchronous, remember to use the `await` keyword. 

Note that each route has its own try-catch block.  
This helps isolate error handling, ensuring appropriate response status codes and custom error messages for different operations.

#### GET
Retrieve messages from `messageService` and send them as a response using the `res.json()` method.

#### POST
A [POST](https://en.wikipedia.org/wiki/POST_(HTTP)) request assumes that the server accepts the data enclosed in the body of the request message.

In our case, the request body contains two fields: the message text and the username:
```
req.body.content
req.body.username
```

Add a check to ensure the `content` parameter is present in the request body, similar to the `username`. 
If it's missing, respond with the message `'Message content is required'` and the code `400`.

Next, add the message to `messageService` using
the `addMessage` method, which will return an object containing the fields `id`, `username`, and `content`.
Use this object in the handler's response, and set the response status code to `201`, which means `Created`.

### Check yourself
For self-testing and debugging, use the tests provided in the `backend/__test__/messages.test.js` file and the frontend.
These tools will help you see how just a few lines of code bring you closer to a fully working application.

<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/messages.gif">
</div>

---

#### DELETE (optional)
This task is optional and will not be checked when clicking the `Check` button, so it does not affect course completion.

To implement message deletion, you will need to:
- Retrieve the message `id` from the route parameters: `req.params.id`.
- Perform the deletion using `messageService`.
- If the message is not found, return the `404` code with the body `{ message: 'Message not found' }`.
- If deletion is successful, return the `204` (`No Content`) code with `res.status(204).send()`.

Remember to update the test cases in the `backend/__test__/messages.test.js` file by replacing `xit` with `it` to activate them. 

<div class="hint" title="Route parameters">

[Earlier](course://Backend/GettingStartedExpress/sum_route_implementation) in the course, we used query parameters like this:
```text
/some_route?id=value
```
In the code, we used this parameter as follows:
```js
req.query.id
```

However, there is also another method where values are part of the URL:
```text
/some_route/value
```
This method requires specifying a placeholder (e.g., `'/:id'`) when declaring the handler.
This allows you to access the value using the name specified in the placeholder:
```js
req.params.id
```  
</div>
