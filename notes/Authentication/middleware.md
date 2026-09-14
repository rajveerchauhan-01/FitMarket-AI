Authentication Middleware

Authorization Middleware

Role Middleware

Protect Routes

next()

req.user

Why Validation Belongs in Middleware
Validation is not business logic.
Validation is not request handling.
Its responsibility is to reject invalid requests before they reach the controller.
Benefits:
Cleaner controllers
Cleaner services
Reusable validation logic
Easier testing
Better separation of concerns
Typical flow:
Route
   │
   ▼
Validation Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Model

JWT authentication middleware verifies the token before protected routes reach the controller. The decoded identity is attached to req.user, allowing downstream controllers/services to identify the authenticated user.

JWT middleware authenticates the request by verifying the token, retrieving the corresponding user, removing sensitive fields such as the password, and attaching the user to req.user for downstream controllers.