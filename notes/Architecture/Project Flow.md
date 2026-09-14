  
Client
   │
   ▼
Express
   │
   ▼
Route
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Model
   │
   ▼
MongoDB

📄 Project Flow.md
Backend Startup Flow
Run server.js

↓

Load Environment Variables

↓

Connect MongoDB

↓

Start Express Server
Why connect DB before app.listen()?
Wrong
app.listen()

↓

Database Connecting

↓

Request Arrives

↓

Database Not Ready
Correct
Database Connected

↓

app.listen()

↓

Server Accepts Requests
Request Flow
Client

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Model

↓

MongoDB
Response Flow
MongoDB

↓

Model

↓

Service

↓

Controller

↓

Client

// project success failure flow
Why do we throw instead of return for errors?
Our project follows one consistent rule:
Service
Success  → return

Failure  → throw
Controller
try {
    call service
    send success response
}
catch {
    send error response
}
This keeps every service in FitMarket-AI consistent.