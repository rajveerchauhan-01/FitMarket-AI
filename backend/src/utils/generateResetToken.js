import jwt from "jsonwebtoken";

export const generateResetToken = (user) => {
    const resetToken = jwt.sign(
        {
            id: user._id,
            purpose: "password-reset"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10m"
        }
    );

    return {
        resetToken,
        expiresIn: "10m"
    };
};