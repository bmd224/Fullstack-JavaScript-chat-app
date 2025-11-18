Oh no, it looks like we've lost something! Remember the `/sum` route we added in the [New route handler](course://Backend/GettingStartedNode/new_handler) task? 
Let's recreate it, but this time, we'll use Express.js.

### Task
Add support for a `GET` route `/sum`.

The handler should take parameters `a` and `b` (both expected to be integers), calculate their sum, and return a JSON response in the following format:
```json
{ 'sum': <actual_sum> }
```

If either parameter is missing or not a valid number, the handler should return the following JSON response with a `400` status code:
```json
{ message: 'Invalid query parameters. Ensure "a" and "b" are numbers.' }
```

You can manually test your program using the following example URLs — or create your own test cases:
- http://localhost:8000/sum?a=10&b=-20
- http://localhost:8000/sum?a=Hello&b=20
- http://localhost:8000/sum

<div class="hint" title="Converting a string into a number">

Since query parameters are always strings, you may need the [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) function to convert them to numbers.
</div>
