Updating a Document
When using:
const user = await User.findOne(...);
You receive a Mongoose Document.
You can modify its properties:
user.name = "Raj";
But these changes exist only in memory until you call:
await user.save();
save() writes the updated document back to MongoDB.
