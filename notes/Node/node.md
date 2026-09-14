Modules

File System

Streams

Buffers

Events

Process

Environment Variables

Event Loop

Async

Promises

Question: Does the "main" field decide which file runs when we execute node src/server.js?
✅ Answer: No.
A strong answer:
"The main field specifies the default entry point when the project is used as a package by another application. It does not control which file is executed when running node or an npm script. Those commands explicitly specify the entry file."

Why don't we write everything inside server.js? Why do we separate app.js and server.js?

A strong answer would be:
"We separate them to follow the Single Responsibility Principle. app.js is responsible for creating and configuring the Express application—middleware, routes, and error handling. server.js is responsible for starting the server and initializing infrastructure like the database connection. This separation makes the application easier to test, maintain, and scale."

Q: Why do we call dotenv.config() before connecting to the database?
A strong answer:
"dotenv.config() loads the variables from the .env file into process.env. We call it before using environment variables so that values like the database URL, JWT secret, and API keys are available when the application initializes."

📘 Node.js process.exit() Notes
What is process.exit()?

process.exit() is a built-in Node.js method that immediately stops the running Node.js application.

Syntax:

process.exit(code);
0 → Program exited successfully.
1 → Program exited because of an error.
Why do we use process.exit(1)?

When a critical error occurs and the application cannot continue running safely, we terminate the process.

Example:

Database connection fails.
Required environment variable is missing.
Invalid application configuration.

Instead of keeping the server alive in a broken state, we stop it.

Example 1: Database Connection Failure
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
try {
await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

} catch (error) {
console.error("Database connection failed:", error);

    process.exit(1);

}
};

startServer();
What happens?
Application Starts
│
▼
Connect Database
│
┌────┴────┐
Success Failed
│ │
▼ ▼
Start Print Error
Server │
▼
process.exit(1)
│
▼
Application Stops
Without process.exit(1)
try {
await connectDB();
} catch (error) {
console.log(error);
}

Output:

Database connection failed.

The program may still continue running (depending on what other resources are active), even though it can't connect to the database.

With process.exit(1)
try {
await connectDB();
} catch (error) {
console.log(error);

    process.exit(1);

}

Output:

Database connection failed.
Application terminated.

The application stops immediately.

Example 2: Missing Environment Variable
if (!process.env.JWT_SECRET) {
console.log("JWT_SECRET is missing.");

    process.exit(1);

}

Since authentication depends on JWT_SECRET, there's no point continuing.

Example 3: Missing API Key
if (!process.env.API_KEY) {
console.error("API Key not found.");

    process.exit(1);

}
Example 4: CLI Program
const file = process.argv[2];

if (!file) {
console.log("Usage: node app.js <filename>");

    process.exit(1);

}

console.log("Reading:", file);

Output:

Usage: node app.js <filename>

Program exits immediately.

Exit Codes
process.exit(0);

Meaning:

Program completed successfully.
No errors.

Example:

console.log("Task completed.");

process.exit(0);
process.exit(1);

Meaning:

Program terminated because of an error.

Example:

console.error("Database connection failed.");

process.exit(1);
When to Use process.exit(1)

✅ Database connection fails

await connectDB();

✅ Required environment variable is missing

if (!process.env.JWT_SECRET)

✅ Invalid configuration

if (!config.apiKey)

✅ Fatal startup error

process.exit(1);
When NOT to Use process.exit(1)

❌ API request error

app.get("/users", async (req, res) => {
try {
const users = await User.find();
res.json(users);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });

        // ❌ Don't use process.exit(1)
    }

});

Reason: Only one request failed. The server can continue serving other requests.

❌ User enters invalid data

if (!email) {
return res.status(400).json({
message: "Email is required"
});
}

❌ Route not found

res.status(404).json({
message: "Not Found"
});
Quick Interview Answer

Q: What is process.exit(1) in Node.js?

Answer:

process.exit(1) immediately terminates the Node.js process and returns an exit code of 1, which indicates an error. It is typically used for unrecoverable errors during application startup, such as a failed database connection or missing required environment variables. It should not be used for normal request or validation errors because those can be handled without stopping the server.

Exit Code Meaning Example
process.exit(0) Success Task completed successfully
process.exit(1) Error Database connection failed
Use process.exit(1) Fatal startup/system errors DB failure, missing .env, invalid configuration
Don't use process.exit(1) Request-level errors Validation errors, 404, failed API request
