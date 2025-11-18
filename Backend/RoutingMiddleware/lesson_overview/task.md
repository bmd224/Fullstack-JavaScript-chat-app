So, we're finally ready to add the necessary routes to our app.

While using Express has already simplified the process of building our application,  
we can make programming even more convenient and the structure of large applications even clearer.
To achieve this, we will use [express.Router middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.router).

In this lesson, you will learn how to:
- Create a _router_ to organize your code by grouping related route handlers.
- Implement logic for handling meaningful requests.
- Connect route handlers with the data layer.
- Store passwords in hashed form and compare them properly.

### Routing middleware 

Earlier in the course, we already used routing methods — for example, when we added routes using the `app.get` method.
However, in a larger application, this approach can result in a disorganized collection of route handlers all within the same file, 
making the code extremely difficult to maintain.

To improve organization, we can logically group routes and assign each group to an entity responsible for handling them.
In Express.js, this entity is called a _router_.


<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/routers.png">
</div>

This request redirection logic is very similar to [routing in data networks](https://en.wikipedia.org/wiki/Routing).