Upsert
Upsert = Update + Insert
Behavior:
If the document exists → Update it.
If the document doesn't exist → Create it.
Benefits:
Single database query.
Cleaner code.
Avoids separate "find then update/create" logic.
Ideal when there should be only one document per unique identifier.
