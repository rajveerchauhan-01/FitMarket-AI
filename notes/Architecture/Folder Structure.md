Project Structure
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── package-lock.json
Responsibility of Each Folder
config/
Stores project configuration.
Examples
MongoDB Connection
Cloudinary Configuration
Email Configuration
Rule
Configuration only.

routes/
Maps incoming requests to controllers.
Example
POST /register

↓

authController.registerUser()
Routes should never contain business logic.
controllers/
Receives
req
res
next
Delegates work to services.
Controllers should remain thin.
services/
Contains business logic.
Example
Register User

↓

Check Email

↓

Hash Password

↓

Save User
Services coordinate workflows.
models/
Represents MongoDB collections.
Contains
Schema
Model
middleware/
Runs before controllers.
Examples
Validation
JWT Authentication
utils/
Contains reusable helper functions.
Examples
hashPassword()

generateJWT()

comparePassword()
Rule
One reusable task.