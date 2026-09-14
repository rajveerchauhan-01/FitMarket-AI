What is a Schema?
A Schema is a blueprint that defines:
Structure
Data Types
Validation Rules
Default Values
Relationships
Document Behavior
MongoDB is schema-less, but Mongoose enforces a schema before data reaches MongoDB.
Flow:
Client
│
▼
Mongoose Schema
│
▼
MongoDB

--> type
The type property defines the expected data type for a field.
Example:
name: {
type: String
}
Mongoose performs Type Casting
If the value can be converted:
123
↓
"123"
Mongoose automatically converts it.
If conversion is impossible:
age: "Raj"
Mongoose throws a validation/casting error instead of saving invalid data.

--> Type Casting
Mongoose automatically attempts to convert values to the specified type.
Examples:
String
123 → "123"

Number
"25" → 25
true → 1
false → 0

Boolean
1 → true
0 → false
If the value cannot be converted (e.g., "Raj" to Number), Mongoose throws a CastError.

/////////////////////
nterviewer:
What's the difference between a CastError and a ValidationError?

A good answer:
CastError ValidationError
Happens when Mongoose cannot convert a value to the specified type. Happens when a validation rule (required, minlength, enum, match, etc.) fails.
Example: "Raj" → Number Example: Missing required field

//////////////

-->What is an Index?
An index is a special data structure maintained by MongoDB that helps locate documents quickly without scanning the entire collection.
Benefits
Faster searches
Faster sorting
Better query performance
Common Types
Normal Index
schema.index({ email: 1 });
Used to speed up searches.
Unique Index
Created by:
unique: true
Ensures duplicate values cannot exist.
TTL (Time To Live) Index
schema.index(
{ expiresAt: 1 },
{ expireAfterSeconds: 0 }
);
Automatically deletes expired documents.
Used for temporary data such as OTPs and reset tokens.

TTL Index Important Behavior
A TTL index does not delete documents instantly when they expire.
MongoDB's background TTL monitor runs periodically (typically about once per minute).
An expired document may remain in the collection briefly before being deleted.
Never rely on TTL deletion for security checks.
Always verify expiration in your application logic:
Current Time

↓

expiresAt

↓

Expired?

↓

Reject OTP
Use the TTL index only to automatically clean up expired documents from the database.

--> Choosing Data Types
Don't only think about today's requirements.
Think about future flexibility.
Example:
OTP
Although today's OTP is numeric,
483921
storing it as a String is often preferable because:
Preserves leading zeros (039281).
Supports alphanumeric OTPs in the future.
Comparisons remain straightforward.
Choose data types based on both current and potential future requirements.

OTP schema fields can have conditional requirements based on purpose. Registration OTP stores pending registration data, while login OTP references the existing user through userId. Email and phone uniqueness belongs to the User collection, not the temporary OTP collection.
