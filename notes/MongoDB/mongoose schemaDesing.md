Common Schema Design Guidelines
Use consistent naming (prefer camelCase).
Give sensible defaults to fields that the server controls.
Don't make a field required if it will always receive a default value.
Use enums for fields with limited valid values (like roles or status).
Enable timestamps: true to automatically track createdAt and updatedAt.
