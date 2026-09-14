import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const header = req.headers.authorization;

    // Check whether Authorization header exists
    // and follows: Bearer <token>
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is required"
        });
    }

    // Extract JWT
    const token = header.split(" ")[1];

    try {
        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find the current user
        const user = await User
            .findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Attach authenticated user to request
        req.user = user;

        // Continue to controller
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Invalid or expired token"
        });
    }
};

export default authMiddleware;