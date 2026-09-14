TTL (Time To Live) Index
A TTL Index allows MongoDB to automatically delete documents after a specified expiration time.
Example use cases:
OTPs
Password reset tokens
Email verification tokens
Session data
Temporary logs
Benefits
Keeps collections clean.
No manual deletion required.
Reduces unnecessary storage.
Built directly into MongoDB.

TTL Index
schema.index(
{ expiresAt: 1 },
{ expireAfterSeconds: 0 }
);
Meaning:
Monitor the expiresAt field.
Automatically remove documents after the expiration time.
Commonly used for:OTPs
Reset tokens
Sessions
Temporary verification data

One Small Caveat
TTL indexes are not instantaneous.
MongoDB's TTL monitor runs approximately once every 60 seconds.
That means there's a small window where:
expiresAt = 10:00:00

Current Time = 10:00:20
The document may still exist until the TTL monitor removes it.
Because of this, many production systems still include:
if (otpDoc.expiresAt < new Date()) {
// Delete document
// Return "OTP expired"
}
as an extra safety check.
