Creating an Expiration Time
Concept:
Current Time

↓

Convert to milliseconds

↓

Add duration

↓

Convert back to Date
Example duration:
5 minutes

=

5 × 60 × 1000 milliseconds
Store the final value as a Date in MongoDB, not as a raw number.


Three Important Ways to Get the Current Time
new Date()
Returns a Date object.
new Date().getTime()
Returns the current time in milliseconds.
Date.now()
Shortcut for:
new Date().getTime()
Also returns the current time in milliseconds.
Creating an Expiration Time
Current milliseconds

↓

Add duration

↓

Convert back to Date
Example:
const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
);