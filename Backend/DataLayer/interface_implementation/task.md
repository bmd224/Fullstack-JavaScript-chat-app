There are a lot of ways to store data: using data structure provided by the programming language,
saving data in a `.csv` file, using a database, and more.

In the [Web app architecture](course://Introduction/Introduction/web_app_arch) lesson, we discussed the concept of a technology stack and 
noted the advantages of designing a project with isolated and replaceable components.
The storage component should follow the same principle.

Our application should not concern itself with the specific details of how exactly storage is implemented. 
Instead, all interactions will go through an abstraction layer, which we call the _data layer_.

<div style="text-align: center; max-width: 900px; margin: 0 auto;">
<img src="images/save_fetch_message.png">
</div>

This approach simplifies our application. For instance, when retrieving or saving a message, 
there’s no need to worry about the exact process of locating the message or writing it to storage.
You can simply invoke the relevant data layer method, like "save this message to storage".

This way, we can change the implementation of the data layer any way we want (and we will at the end of the course).
As long as the data layer’s interface remains unchanged, the rest of the application won’t even notice the change.

Now, let's implement the data layer in the simplest way possible!