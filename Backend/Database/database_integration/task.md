To add support for an SQLite database using Sequelize, we only need to modify a single file: `backend/src/data/dataServices.js`.

---

### Sequelize initialization
First, let's take a brief look at the Sequelize initialization in the `backend/src/data/dbConfig.js` file.
This file includes an important feature: if the project is running in test mode, 
the database is not saved to disk. This ensures the real database is not used during tests.

If you're interested in learning a bit more about the implementation, check out the `backend/jest.setup.js` and `backend/package.json` files.
For now, let's focus on the non-test scenario.
```js
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});
```
Since SQLite is a file-based database, we need to define the path to the database file.
In our case, this will be the current working directory (`backend`).
If you'd like to log all database operations, you can remove the `logging: false` option.

---

### Creating tables
Now, go next to the `backend/src/data/dataServices.js` file.
Here, you will describe the structure of the database tables.
This is required for two purposes: to initialize the tables if the database is empty (e.g., during the first run of the application),
and to map the database records to JavaScript objects.

The `Users` table will be defined as follows:

| username | password     |
|----------|--------------|
| TestUser | testpassword |
| Tom      | 12345678     |

Here, `username` and `password` are both of type string (`DataTypes.STRING`) and cannot be empty (`allowNull: false`).
The `username` field is unique
and can be used for unambiguous searches (`primaryKey: true`).

The `Messages` table can look like this:

| id | username | content      |
|----|----------|--------------|
| 1  | Tom      | Hello!       |
| 2  | TestUser | Test message |

The database can automatically generates unique IDs for message records.

---

### Task
#### Messages table
Complete the `Messages` table initialization with the following fields using the `Users` table as an example:
- `username`: must be of type `DataTypes.STRING` and cannot be `null`.
- `content`: must be of type `DataTypes.TEXT` and cannot be `null`.

#### User service
Next, let's update the user service to interact with the database instead of using in-memory storage.

In the `createUser` method:
1. Use the `Users.findByPk` method to find a user by their primary key. Provide the `username` as an argument.
2. Create a user using the `Users.create` method. Pass a JS object with the necessary properties:
   `{ username: <username_value>, password: <password_value> }`

In the `getUser` method:
1. Find a user by their primary key.
2. If a user is found (`findByPk` did not return `null`), return it as a plain JS object using the `.get({ plain: true })` method.
3. If no user is found, return `undefined` to keep the method interface the same.

#### Message service
In the `addMessage` method:
1. Add a new message using the `Messages.create` method. Provide the following object as an argument:
   `{ username: <username_value>, content: <content_value> }`. Note that we no longer need to generate an ID for each message, as the database will handle it.
2. The `Messages.create` method returns the newly added database record. `addMessage` should return it as a plain object (use the `.get({ plain: true })` method).

In the `getMessages` method:
- Use the `Messages.findAll({raw: true})` async method to retrieve all messages from the database.  
  This ensures you get an array of plain JS objects as a result.

#### deleteMessage (optional)
_This task is optional._  
Completing it will not affect course progress or completion, and it isn’t checked when you click the `Check` button.

Using the [destroy](https://sequelize.org/docs/v7/querying/delete/) method, delete a message with the provided `messageId`.
Return `true` if the message was found and deleted.

---

### Check yourself
That's it! No further changes to the project are required, except for the tests. 
We have already updated the tests in the `backend/__tests__` directory for you.
You can use them to verify your functionality and enjoy a fully working backend by using the frontend.
Now, even restarting the application will no longer result in the loss of user or message data.

<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/breathtaking.gif" alt="Sockets with auth">
</div>
