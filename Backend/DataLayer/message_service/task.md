Great! Now that we know how to work with users, let's add a `messageService` for handling messages.
We'll use the already declared `store.messages` array for storage.

To make this task easier, look at the tests in `backend/__tests__/dataServices.test.js`.
These tests will help you better understand the expected result.

### Task
Implement the `addMessage` and `getMessage` methods.
Messages should be stored in the `store.messages` array as objects with the following format:


```js
{
    id: <unique_message_id>,
    username: <username>,
    content: <content>
}
```

#### addMessage
This method should add a new message object to the end of the `messages` array and return it as the return value.

To ensure each message has a unique `id`,
use Node.js's built-in `crypto.randomUUID()` [method](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions) to generate it. 
An ID generated this way might look like:

```text
b0b2af55-41f4-4f9d-a6aa-0a91b31e93d7
```

#### getMessage
This method should return the `messages` array as the result.

<div class="hint">

For this task, the [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method might be very helpful.
</div>

### Optional task
Implement the `deleteMessage` method. It should find and delete (with shift) a message with an `id` equal to `messageId` from the `store.messages` array.
Note that the order of the remaining messages in the array should not change.

The method should return `true` if a message was deleted and `false` otherwise (for example, if no message with such an ID was found).

**This task is optional.**

Completing it doesn’t affect course progress or completion, and it isn’t checked when you click the `Check` button.
However, it’s a great opportunity to practice your skills.

Tests for this task are already prepared in `backend/__tests__/dataServices.test.js`.
These tests are declared with the `xit` keyword, meaning they won't run by default.
To enable the tests, simply replace `xit` with `it`, like in all other test cases.
