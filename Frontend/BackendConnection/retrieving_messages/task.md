Let's focus on the main page of our chat: [_Chat.jsx_][Chat].
To avoid confusion, in this task, we will only implement fetching and displaying existing messages.
Sending messages will be covered in the next task.

First, we need an array to store messages:

```jsx
const [messages, setMessages] = useState([]);
```

Next, display each message as a separate `<div>` containing the message's `username` and `content`. 
The [`map` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is perfect for this:

```jsx
{messages.map((message) => (
    <div key={message.id} className="message">
        <strong>{message.username}: </strong>
        <span>{message.content}</span>
    </div>
))}
```

Then, use the `fetchMessages` function, called in the `useEffect`, to implement message retrieval from the `'/api/messages'` route.

### Task

1. Add message rendering using the `map` function as shown above.
2. Implement the `fetchMessages` function:
   - Retrieve the token from `localStorage`.
   - Fetch messages from the backend:
     ```jsx
      const response = await axios.get('/api/messages', {
      headers: { Authorization: `Bearer ${token}` }
      });
     ```
   - Save them to the `messages` variable: `setMessages(response.data);`.

### Check yourself
Use the tests in the `frontend/__tests__/chat_test.jsx` file to better understand the task and verify your work.

Next, run the application and check the display of messages that are already stored in the database!

<div style="text-align: center; max-width: 1000px; margin: 0 auto;">
<img src="images/messages.png" alt="Messages">
</div>

### Console output
We’ve added debug output using `console.log` and error messages with `console.error`. 
Backend messages appear in the terminal. To see them on the frontend, open your browser's developer console. 
Learn [here](https://developer.chrome.com/docs/devtools/open) how to open it for Google Chrome.

Developer tools in all popular browsers offer many debugging features; we recommend exploring them.


[Chat]: course://Frontend/BackendConnection/retrieving_messages/frontend/src/pages/Chat.jsx
