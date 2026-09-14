OTP Storage Strategy
For FitMarket-AI:
User Collection: Stores permanent user data only.
OTP Collection: Stores temporary OTPs and their expiration times.
After successful OTP verification:Create the user.
Delete the OTP document.

This keeps responsibilities separate and makes it easy to migrate to Redis later without changing the authentication flow.

later we will use redis

OTP Collection Design
An OTP document should contain only temporary authentication data.
Suggested fields:
identifier (email or phone)
otp
purpose
attempts
expiresAt
Use timestamps: true to automatically track createdAt.
Keep OTPs separate from the User collection because they are temporary and have a different lifecycle.

Receive identifier + OTP
│
▼
Find OTP Document
│
├── Not Found?
│
└── Invalid OTP
│
▼
Expired?
│
├── Yes
│
└── Delete OTP
Return Error
│
▼
OTP Matches?
│
├── No
│
├── attempts++
│
├── Save
│
├── attempts >= 5 ?
│ │
│ ├── Delete OTP
│ └── Return Error
│
▼
Correct OTP
│
▼
Create User
│
▼
Delete OTP
│
▼
Generate JWT
│
▼
Return Success

// validateotp
Receive identifier + OTP
│
▼
Find OTP Document
│
├── Not Found
│ │
│ └── Invalid OTP
│
▼
Expired?
│
├── Yes
│
├── Delete OTP
│
└── Return "OTP Expired"
│
▼
OTP Correct?
│
├── No
│
├── attempts++
│
├── Save
│
├── attempts >= 5 ?
│ │
│ ├── Delete OTP
│ └── Return
│ "Too many attempts.
│ Please request a new OTP."
│
▼
Create User
│
▼
Delete OTP
│
▼
Generate JWT
│
▼
Return Success

Responsibilities
Check if identifier is present.
Trim whitespace from the identifier.
Check if otp is present.
Verify that the OTP contains exactly 6 digits.
Call next() if validation passes.
The middleware should not:
Query the OTP collection.
Compare OTP values.
Check expiry.
Create a user.
Generate a JWT.
Those are all service responsibilities.

Register
│
└── Generate OTP

Verify OTP
│
└── Verify OTP

Resend OTP
│
└── Generate another OTP
