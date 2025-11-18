## Database
We have completed developing the app! It now supports sending and receiving messages through a REST API, 
 real-time communication using WebSockets, and protection through authorization.

Now, the final step is to ensure that our data persists even after restarting the app. 
To achieve this, we need to switch from in-memory storage to a database. Thanks to the app's architecture, this transition will be easy.

In this lesson, you will learn how to:
- Change the data layer without modifying other parts of the app.
- Connect an _SQLite_ database to the _Node.js_ project.
- Use a simple _Object-Relational Mapping_ (ORM) library to work with the database.

### Database
Databases are a vast topic, but we’ll keep things simple. Instead of covering different types of databases,
we’ll only focus on a basic example to give you a starting point.

As an example, our app will use [SQLite](https://www.sqlite.org/) — a simple, file-based SQL database.
SQL databases allow you to store, retrieve, and manage structured data using SQL (Structured Query Language) and organize data into tables with rows and columns.

While SQL is logical, it's not the easiest tool for beginners to work with:

```SQL
SELECT * FROM Users WHERE username = 'TestUser';
```

To simplify things, we won’t work with SQL directly. Instead, we’ll use a helper library to handle database interactions.

### ORM
Since we don’t want to dive deeply into SQL right now, we’ll be using [Sequelize](https://sequelize.org/), 
a simple ORM library for Node.js with SQLite support.
An ORM allows you to interact with a database using familiar JavaScript methods instead of writing SQL queries:

```js
const user = await Users.findByPk('TestUser');
```

This is a much more convenient way, especially for those who are comfortable with JavaScript but might not yet be familiar with SQL.
