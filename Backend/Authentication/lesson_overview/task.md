We’ve almost finished our backend!
Everything is coming together, and the backend is functional, but there’s a major issue: right now, anyone can send a message on behalf of any user. Clearly, this isn't acceptable.

In this lesson, you will learn how to:
- Implement simple authentication for routes and WebSockets using JWT.

### JWT
To implement authentication, we need a way to identify requests coming to our routes.
It would be convenient if each request contained some special information that indicates which user is making the request
and is tamper-proof. The simplest way to achieve this is by using [JWT](https://jwt.io/) (JSON Web Tokens).

<div style="text-align: center; max-width:400px; margin: 0 auto; ">
<img src="images/jwt_logo.svg">
</div>

A token might look something like this (although it will usually be much longer):
```text
eyJhbGcikpXVCJ9.eyJ3ODkwMjM5MDIyfQ.SflKxw_adQssw5c
```

It consists of three encoded parts, separated by dots:
- **Header**: Specifies the type of token (JWT) and the algorithm used for signing (e.g., HS256 or RS256).
- **Payload**: Contains the actual data (called "claims"), such as user information or permissions. This is where we’ll store the username.
- **Signature**: A cryptographic signature generated using the header, payload, and a secret key. This ensures the token hasn’t been tampered with.

During authorization, we issue a token signed with our secret key to the user, and they must include this token with each request.
Since the token's payload is not encrypted, its data can be easily read. Keeping the secret key private ensures that only we can
verify the token's authenticity and confirm it was issued by us for a specific user.

<div class="hint" title="OAuth">

  For larger applications, [OAuth](https://oauth.net/2/) is commonly used instead of JWT.
  OAuth is an open standard for authorization that allows third-party applications to access user data without exposing their credentials. It works by delegating access via tokens issued by an authorization server.

  Although OAuth is more flexible, it is also more complex. For a simple application like ours, using JWT is enough.
</div>
