HTTP

Client

Server

Request

Response

Headers

Body

Params

Query

JSON

Why do we separate app.js and server.js?

A strong answer is:
"We separate them to follow the Single Responsibility Principle. app.js is responsible for configuring the Express application—middleware, routes, and error handling—while server.js is responsible for starting the server, connecting to external services like the database, and listening on the configured port. This makes the application easier to test, maintain, and scale."

Why do we use Express instead of Node's built-in http module?

A strong answer is:
"Node.js provides the runtime and the low-level http module to create servers, but building a large application with it requires a lot of boilerplate code. Express simplifies backend development by providing routing, middleware support, request and response utilities, and a clean architecture, making applications easier to build and maintain."

Does Express replace Node.js?

❌ No.
A strong answer is:
"Express is a framework built on top of Node.js. Node.js provides the runtime environment and HTTP server, while Express simplifies backend development by providing routing, middleware support, and utilities for handling requests and responses."

What is package.json?

A strong answer is:
"package.json is the manifest file of a Node.js project. It stores metadata about the project, manages dependencies, defines scripts, specifies project information like name and version, and allows anyone to recreate the project's environment by running npm install."

I cloned your GitHub project. There is no node_modules folder. What should I do?

Correct Answer:
"Run npm install. npm reads the dependencies from package.json, downloads them, creates the node_modules folder, and recreates the project's environment."

📘 Interview Note – package-lock.json
What is package-lock.json?
It records the exact versions of every installed dependency and sub-dependency.
Why do we need it?
Ensures every developer gets the same dependency versions.
Makes builds reproducible.
Prevents "works on my machine" problems.
Speeds up npm install because npm already knows the dependency tree.

Can we delete package-lock.json?

A strong answer is:
"Yes, it can be deleted, and npm will generate a new one the next time dependencies are installed. However, in a professional project, we should not delete or ignore it because it locks the exact dependency versions, ensuring consistent installations across all developers and environments."


Express Router Flow
Client

↓

app.use()

↓

Router

↓

Controller
app.use()
Purpose
Mount middleware or routers at a specific path.
Example
app.use("/api/v1/auth", authRouter)
Controller
Acts as bridge between HTTP layer and business logic.
Responsibilities
Receive Request
Return Response
Call Service