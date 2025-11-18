Okay, we've learned how to add new routers, but so far, they’re completely non-interactive. Let's fix that!

### Query parameters
The client — whether a web browser or the frontend of our application — can send different data with the request.
The easiest way to do this in a `GET` request is by using _query parameters_.
These parameters are specified directly in the URL after the `?` symbol, using the following format:

```html
http://localhost:8000/any?param1=value1&param2=value2
```

For example, consider a `/echo` route that expects to receive a message via the `message` query parameter:
```html
http://localhost:8000/echo?message=Hello
```

You can access the parameters using the `req.query.<parameter_name>` expression:

```js
const message = req.query.message;
```

Since query parameters might sometimes be missing, always make sure to check that the value you receive is not `undefined`.

### JSON response
When sending a response, it’s often convenient to send data as a key-value pair,
especially if we need to work with several values at once.
The easiest way to do this is by using the [JSON](https://en.wikipedia.org/wiki/JSON) format, which closely resembles JavaScript object syntax.

Using JSON, you can send a response while explicitly specifying key-value pairs and a status code:
```js
res.status(400).json({message: 'No message provided'});
```

You can also shorten this if the variable name matches the desired key name:
```js
res.json({message});
```

What is equal to:
```js
res.status(200).json({'message': '<message_variable_value>'});
```

Note that we don't need to call the `.type` method anymore because `.json` automatically sets the type to `'application/json'`.

### Play with it!
Try running the application and experimenting with different values for the `message` parameter — or omit
the parameter entirely — and observe the response.

For example:
- http://localhost:8000/echo?message=Hello
- http://localhost:8000/echo?message1=Hello
- http://localhost:8000/echo

<div style="max-width:600px;">
<img src="images/echo.gif">
</div>
