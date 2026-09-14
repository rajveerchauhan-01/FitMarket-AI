📄 Authentication Flow.md
Entire authentication architecture.
Example
Register

↓

Validate

↓

Hash Password

↓

Save User

↓

Generate OTP

↓

Send Email

↓

Verify OTP

↓

Login

↓

JWT

↓

Protected Routes

User Creation Strategy
Preferred production flow:
User Enters Details
│
▼
Send OTP
│
▼
Verify OTP
│
▼
Create User
│
▼
Generate JWT
Why?
Keeps the database clean.
Prevents fake/unverified accounts.
Improves analytics.
Reduces unnecessary storage.
Better security against spam registrations.

Keep APIs Focused
A good API should have one primary responsibility.
Example:
Register API: Validate details, check uniqueness, generate and send OTP.
Verify OTP API: Verify the OTP, create the user, and complete registration.
Separating responsibilities makes the code easier to understand, test, and maintain.

Registration with OTP
Client
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
Check User Collection
│
├── Exists → Return Error
│
▼
Check OTP Collection
│
├── Exists → Delete Old OTP
│
▼
Generate New OTP
│
▼
Store OTP
│
▼
Send OTP
│
▼
Return Success
Benefits
Only one active OTP per user.
No duplicate registrations.
Cleaner authentication flow.
Easier OTP verification.

Password Handling During Registration
The password should be hashed before storing it in the OTP collection.
Flow:
Register Request
│
▼
Hash Password
│
▼
Store Hashed Password in OTP Collection
│
▼
Verify OTP
│
▼
Create User (reuse hashed password)
│
▼
Delete OTP Document
Benefits:
Plain text passwords are never stored in the database.
The password is hashed only once.
Improves security without adding extra complexity.

Login OTP should be associated with the authenticated user's userId and purpose: "login". The user's email/phone is used to locate the account, while userId identifies the account whose OTP is being verified.
