Documents

Collections

CRUD

Aggregation

Indexes

Schema Design

Mongoose

Populate

Transactions

Principles followed in the User model
Use camelCase for field names.
Add trim to string fields entered by users.
Store phone numbers as String, not Number.
Give server-controlled fields sensible defaults (role, isVerified, profilePic).
Use enum for roles.
Enable timestamps: true to automatically track creation and update times.
Start with only the fields required by current features and evolve the schema as the application grows.
