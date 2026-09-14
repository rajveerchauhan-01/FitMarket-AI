Express Basics

Express App

Request

Response

Middleware

Router

Static Files

Error Middleware

What is the difference between express and app?

A strong answer would be:
"express is a function exported by the Express library. When we call express(), it creates and returns an Express application object. We usually store that object in a variable named app, which provides methods like use(), get(), post(), and listen() to build our server."

Should an Express server start if the database connection fails?

A good answer is:
"Generally, no. If the application depends on the database for its core functionality, it should fail fast by logging the error and exiting. Running the server without a database would cause most requests to fail anyway."

"Why didn't you just write app.listen() at the bottom of server.js like most tutorials?"

A strong answer would be:
"Because database connection is asynchronous. I wanted to ensure the application doesn't accept requests until MongoDB is connected. Wrapping the startup sequence in an async startServer() function lets me await the database connection first. If the connection fails, the server never starts, preventing requests from hitting an unusable backend."

Suppose in app.js we have:
app.use("/api/v1/auth", authRouter);
What Express does internally is:
Incoming Request
│
▼
/api/v1/auth/register
│
▼
Matches "/api/v1/auth"
│
▼
Removes that prefix
│
▼
Passes "/register" to authRouter
So inside authRouter, Express already removed the /api/v1/auth part.
That's why inside auth.routes.js you only write:
/register
/login
/logout
NOT
/api/v1/auth/register
/api/v1/auth/login
Otherwise, the final route would become:
/api/v1/auth/api/v1/auth/register

This is an important design principle
A service should use utilities.
A utility should never know about services.
Service
│
├── uses hashPassword()
├── uses generateJWT()
├── uses sendEmail()
└── uses generateOTP()
Utilities are generic building blocks.
Services contain your application's business logic.

app.js Responsibility
Responsible for
Express Application
Middleware Registration
Route Registration
Should NOT
Connect Database
Start Server
server.js Responsibility
Responsible for
Loading Environment Variables
Connecting Database
Starting Express Server
Acts as application entry point.
db.js Responsibility
Responsible only for
MongoDB Connection
Should never
Register Routes
Start Express Server
Why Separate app.js and server.js?
Bad
Everything inside one file
Problems
Harder to Test
Harder to Scale
Mixed Responsibilities
Good
app.js

↓

Express

server.js

↓

Startup

db.js

↓

Database
Each file has one responsibility.

Controller Responsibilities
A controller should:
Receive HTTP request (req)
Call the appropriate service
Receive the service result
Return an HTTP response (res)
Handle errors
A controller should not:
Query MongoDB
Hash passwords
Generate OTPs
Implement business logic

Route Responsiblity
A Route should:
Define the endpoint (/register)
Define the HTTP method (POST)
Connect middleware
Connect the controller
A Route should not:
Validate business rules
Query MongoDB
Generate OTP
Hash passwords

Responsibilities
Create an Express Router.
Define API endpoints.
Attach middleware.
Call the appropriate controller.
Flow
POST /register
│
▼
validateRegister
│
▼
registerUser
The route acts like a traffic manager. It doesn't know how OTP generation, hashing, or database operations work—it only decides which functions run for a given endpoint.
