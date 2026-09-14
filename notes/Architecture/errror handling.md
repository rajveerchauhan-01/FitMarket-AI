Version 1
Each controller handles its own errors using try...catch.
Responsibilities:
Call the service.
Catch service errors.
Return appropriate HTTP status and JSON response.
Version 2 (Production)
Use a global Express error-handling middleware.
Benefits:
Removes repetitive try...catch blocks.
Centralizes error formatting.
Easier to maintain.