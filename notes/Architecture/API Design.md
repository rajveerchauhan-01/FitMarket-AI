REST APIs

Naming Convention

HTTP Methods

Status Codes

Versioning

Resource Naming

Nested Routes

Pagination

Filtering

Searching

Sorting

Best Practices

Examples::
GET

POST

PATCH

PUT

DELETE

Naming
/products

/users

/orders
instead of
/getProducts

/createUser

API Versioning
Instead of
/login

/register
Use
/api/v1/auth/login

/api/v1/auth/register
Benefits
Backward Compatibility
Easier Upgrades
Cleaner APIs
Route Mounting
In app.js
app.use("/api/v1/auth", authRouter)
Inside authRouter
Correct
/register

/login
Wrong
/api/v1/auth/register
Reason
Express automatically removes the mounted path before entering the router.
📄 Authentication Flow.md
Authentication Architecture
Register Request

↓

Validation

↓

Controller

↓

Service

↓

Hash Password

↓

Save User

↓

Return Response
Authentication Middleware
Future Flow
Request

↓

JWT Middleware

↓

Verify Token

↓

Attach User to req

↓

next()
Purpose
Protect private routes.

//  
Designing APIs:--endpoints in our project for user validation
POST /register

POST /verify-email

POST /resend-otp

POST /login

POST /logout

POST /forgot-password

POST /verify-reset-otp

POST /reset-password

PATCH /change-password

points which we have to remver while deciding the endpoints

1. What actions can the user perform?
2. What data is needed for each action?
3. What endpoint best represents that action?


Designing Flexible APIs
When multiple identifiers can perform the same action, consider using a generic field.
Example:
{
  "identifier": "...",
  "password": "..."
}
The backend determines whether the identifier is:
Email
Phone
Username (future)
Benefits
Cleaner API
Simpler frontend
Easy to extend without changing the request format
Better long-term maintainability