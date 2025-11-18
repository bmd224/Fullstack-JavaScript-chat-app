We have already learned how to retrieve messages, now it’s time to add the ability to send new ones!

This isn't hard, and all the steps are already familiar to us.
Try to imagine the solution algorithm without looking at the placeholders in the code, then check yourself by opening the hint below.

<div class="hint" title="Send new message implementation">

  So, to add this feature to the project, we need to:
  - Declare a variable to store the new message.
  - Add a form to input the message.
  - Add an `onChange` action to save the entered value to the corresponding variable.
  - Add a handler for submitting the form.
</div>

### Task

1. Using `useState`, declare a variable `newMessage` with an initial value of an empty string.
2. Add an `onChange` handler for the input field in the message form. This can be done in one line: `onChange={(e) => setNewMessage(e.target.value)}`.
3. Implement the `handleSubmit` function:
    - Retrieve the token from `localStorage`.
    - Perform a POST request to the backend with the `newMessage` as the `content`:
      ```jsx
      await axios.post('/api/messages',
          { content: newMessage },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      ```
    - Clear the message input field by setting `newMessage` to an empty string.

### Check yourself
Use the updated tests in the `frontend/__tests__/chat_test.jsx` file to better understand the task and verify your work.

Next, run the application and try to send a message.
For now, you will need to refresh the page to see the new message. But in the next lesson, we will add WebSocket support!

<div style="text-align: center; max-width: 600px; margin: 0 auto;">
<img src="images/sending.gif" alt="Sending and receiving messages">
</div>
