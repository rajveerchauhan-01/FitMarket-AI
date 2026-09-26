import jwt from "jsonwebtoken"
import User from "../models/User.js";


const authenticateResetToken = async (req, res, next) => {


    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization token required"
        })
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        )
        if (decoded.purpose !== "password-reset") {
            return res.status(401).json({
                success: false,
                message: "Invalid password reset token. "
            })
        }
        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found "
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Invalid or expired token"
        });
    }
}

export default authenticateResetToken;