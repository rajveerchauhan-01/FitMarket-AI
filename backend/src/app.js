import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 FitMarket API is running...",
    });
});

export default app;