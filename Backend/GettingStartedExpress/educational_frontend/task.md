You probably found the process of debugging your backend app using a browser in the previous step to be cumbersome — 
and you're right! It's not the standard approach for developers.

To streamline the process, developers use specialized tools to send various HTTP, REST, and other requests.  
Popular options include [Postman](https://www.postman.com/), the open-source [HTTPie](https://httpie.io), and the integrated [HTTP client](https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html) in WebStorm.

This course, however, won’t overwhelm you with these tools at this stage. Instead, we've prepared an educational frontend
that you can use to test your application as you develop it — until you build your own custom frontend.

### Updated project structure
Our project structure has changed once again! We'll use the following structure for the remainder of the course. 

Now, we have two top-level directories: _backend_ and _frontend_.  
Each has its own **package.json**, which is responsible for its respective part of the project. 
Additionally, there’s a common **package.json** file at the root level, which allows us to launch the entire project.

```text
.
├── backend 
│   ├── package.json  // backend config
│   └── src
│       └── index.js
├── frontend
│   ├── ...
│   ├── package.json  // frontend config 
│   └── ...
└── package.json      // common config
```

If you're curious, you can explore how the frontend is designed for each task. 
However, in the first part of the course, you're not required to look into the frontend unless you want to — so feel free to stay focused on the backend.

### Launching the entire project
As usual, click the ![](images/run.svg) button next to the start script in the **top-level** **package.json** to start both the backend and frontend.

```json
"start": "concurrently \"cd backend && npm start\" \"cd frontend && npm start\""
```

Now, you will see the terminal output from both the backend (starting with `[0]`) and the frontend (starting with `[1]`).

<div style="text-align: center; width:60%; max-width: 500px;">
<img src="images/front_back_start_log.png">
</div>

⚠️ **Note:** The backend is still available on port `8000`, but to open the frontend, use a different URL: http://localhost:3000/.

### Play with it!

Experiment with the frontend. There's a form for entering values and a `Send` button, which calls your implemented `/sum` route with the specified parameters.

Try to make changes to the backend within the current task (which now includes your solution from the previous task).
Remember to restart the application after making any changes.

<div style="text-align: center; width:50%; max-width: 400px;">
<img src="images/sum_route_frontend.gif">
</div>

We're good! Our backend works with the frontend!

<style>
img {
  display: inline !important;
}
</style>