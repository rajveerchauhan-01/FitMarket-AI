Everything database.
Collections

Relationships

Embedding

Referencing

Indexes

Schema Design

Normalization

Denormalization

Transactions

Aggregation
Diagrams
User

↓

Orders

↓

Products

↓

Reviews

Why server waits for MongoDB
Application should never start accepting requests before database connection is established.
Reason
Otherwise requests may fail due to unavailable database.

Designing a Model
When designing a database model, don't only think:
"What does the registration form ask for?"

Instead ask:
What information belongs permanently to this entity?
Which fields change frequently?
Should changing data be stored as history instead of overwritten?
Will this field be needed for permissions, authentication, or future features?
Is this data intrinsic to the entity, or does it belong in another collection?
A good database model is designed for the entire lifecycle of the application, not just the first screen.

Entity vs Feature
Not every piece of related information belongs in the same collection.
Example:
❌ User
name
email
weight
weightHistory
bodyFat
progressPhotos
This mixes two different concepts.
Better:
User
│
├── name
├── email
├── phone
└── profilePic

Progress
│
├── userId
├── weight
├── bodyFat
├── chest
├── waist
└── createdAt
Rule:
If data changes frequently and you want to preserve its history, it usually belongs in a separate collection instead of being overwritten in the main entity.

File: Architecture/API vs Database.md
Database Model ≠ API Input
A database schema defines what the application stores.
An API defines what data is required for a specific operation.
Different APIs can use different subsets of the same model.
Example:
User Model: firstName, lastName, email, phone, password, role, isVerified, profilePic
Register API: firstName, lastName, email, phone, password
Login API: email OR phone, password
Update Profile API: firstName, lastName, profilePic
Design each API around its purpose rather than making every endpoint require every field from the model.
