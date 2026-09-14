Backend Folder Structure


📁 config/
Stores application configuration.
Examples:
MongoDB connection
Cloudinary configuration
Email configuration
Razorpay configuration
Gemini/OpenAI configuration
Think of it as:
"Everything needed to configure external services."

📁 controllers/
Controllers receive requests from routes.
Example:
POST /api/auth/register

↓

Auth Controller

↓

Register User
A controller should not contain database logic.
Its job is to:
Receive request
Validate basic input
Call the service
Send response
📁 services/
This is where the business logic lives.
Example:
Register User

↓

Check if email exists

↓

Hash password

↓

Save user

↓

Generate JWT
Notice something?
This is business logic, not request handling.
That's why it belongs in services.
📁 models/
Contains Mongoose schemas and models.
Example:
User Model

Product Model

Order Model

Review Model
Every collection gets its own model.
📁 routes/
Defines API endpoints.
Example:
POST /register

POST /login

GET /profile

PUT /profile
Routes decide which controller should run.
📁 middleware/
Code that runs before the controller.
Examples:
JWT Authentication

Role Checking

Request Validation

File Upload

Error Handling

Logging
Flow:
Client

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Database
📁 utils/
Reusable helper functions.
Examples:
Generate OTP

Generate JWT

Send Email

Create Random Token

Format Date
These functions aren't tied to a specific feature, so they live in utils.
Our Complete Request Flow
This is the architecture we'll follow throughout the project:
Client (React)
        │
        ▼
Routes
        │
        ▼
Middleware
        │
        ▼
Controller
        │
        ▼
Service
        │
        ▼
Model
        │
        ▼
MongoDB
This separation is one of the reasons production applications stay maintainable as they grow.