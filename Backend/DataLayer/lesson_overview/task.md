We’re just one step away from starting the backend development of our application.
Like many other applications, our chat app will revolve around a key task: data processing.
Now, we need to address the most critical question: what data will we store, and how will we store it?

In this lesson, you will learn how to:
- Design an interface for a unified way of working with data.
- Implement data layer abstraction.

### What to store
When designing your application, take some time to create a list of the entities and datatypes your project will need.
This will make your development process smoother and save you from having to revisit and rework this stage later. 


<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/storage_boxes.png">
</div>

To keep our project simple, we'll only focus on two types of data for now: messages and users.
However, don’t worry if you’ve overlooked something during the planning stage — you can always add new types of data later if needed.

