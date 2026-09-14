Q1. Why do we separate app.js and server.js?
Answer
app.js creates the Express application.
server.js starts the application.
This separation improves testing, scalability, and follows the Single Responsibility Principle.
Q2. Why should app.listen() wait for MongoDB?
Answer
The application should not accept requests until the database is ready.
Otherwise requests may fail because required resources are unavailable.
Q3. What is the responsibility of a controller?
Answer
Receives HTTP requests, calls services, and sends responses.
Controllers should not contain business logic.
Q4. What is a service?
Answer
A service contains business logic and coordinates workflows like user registration.
Q5. Difference between Service and Utility?
Answer
A service performs a business workflow.
A utility performs one reusable task.
Example
Service

↓

registerUser()

↓

hashPassword()

↓

saveUser()