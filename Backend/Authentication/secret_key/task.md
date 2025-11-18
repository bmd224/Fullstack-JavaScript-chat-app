In the previous task, we mentioned that a JSON Web Token is signed using a secret key, which must be kept private.
Now, we need to generate this key and determine where to store it.

### Generation
While almost any string can serve as a key, it’s best to use specialized tools for generating a strong and secure key. We’ll use the `crypto` library for this purpose.

### Storing
> **Never store secret keys in variables in your code. Do not upload them to repositories or distribute them with your app's code!**

To securely store the key outside of the application code while still allowing it to be accessible at runtime, 
you can use [environment variables](https://en.wikipedia.org/wiki/Environment_variable). 
To simplify managing environment variables, we’ll store them in a `.env` file.

> **Never upload `.env` files to your repository.**

### Task
We will use a small script located in `backend/scripts/generateSecret.js` to generate the key.

The script uses the `crypto.randomBytes` method, which takes the key length (in bytes) as an argument. A 64-byte length will be enough.
Next, the generated key is converted into a string format.

Run the script by clicking the ![](images/run.svg) button in the `backend/package.json` file next to the `"generate-secret"` script. 

<div style="text-align: center; width:100%; max-width: 600px;">
<img src="images/run_script.png">
</div>

You will see output like this, but with a longer key:
```text
MZIuc4b9r4gAQFZxg/ZeDGj+fHPoRWJn4bGRw==
```

Add the generated string as the value of the `JWT_SECRET` environment variable in the `.env` file located in the `backend` directory.
Make sure you copy the entire key, including all characters—such as any equal signs at the end.

<style>
img {
  display: inline !important;
}
</style>
