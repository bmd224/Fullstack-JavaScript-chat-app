When developing the frontend, our main language will remain JavaScript, but we'll also rely on a few additional tools and libraries.

The main library we'll be working with is React.

### React
[React](https://react.dev/) has a component-driven architecture. Instead of focusing on static page elements, 
React enables developers to build reusable, self-contained components, each responsible for a specific part of the UI.
For example, a "Login Form" could be implemented as a reusable React component, used across multiple pages.

This modular approach simplifies code management and enables developers to easily test, update, or replace individual pieces without breaking the entire application.
Moreover, React’s declarative nature makes it intuitive: when data changes, React automatically updates only the parts of the UI affected by that change.

React uses JSX. It's a syntax extension for JavaScript that allows developers to write HTML-like code within JavaScript files,
making it faster and more convenient to create dynamic, interactive UI elements.

Pure JavaScript:
```js
const element = React.createElement('h1', null, 'Hello, World!');
```

JSX:
```jsx
const element = <h1>Hello, World!</h1>;
```


<div style="text-align: center; max-width:100px; margin: 0 auto; ">
<img src="images/react.svg">
</div>

### Vite
When developing React projects, the code often needs to be converted into traditional files like `html`, `js`, etc.
This is where a build system comes in. For our React applications, we’ll use [Vite](https://vite.dev/) –
a modern build tool and development server.
We won't need to perform any conversions manually.

<div style="text-align: center; max-width:100px; margin: 0 auto; ">
<img src="images/vite.svg">
</div>

### HTML and CSS
This course focuses on JavaScript and the technologies necessary to build robust, interactive web applications.
While [HTML](https://en.wikipedia.org/wiki/HTML) and [CSS](https://en.wikipedia.org/wiki/CSS) form the foundation of every web project, we won’t dive deeply into their details here.

If you're already comfortable with HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets), great!
If not, we recommend brushing up on them through accessible resources, such as:
Hyperskill’s [HTML](https://hyperskill.org/university/frontend/html-basics) and [CSS](https://hyperskill.org/university/frontend/css-basics) knowledge bases.
