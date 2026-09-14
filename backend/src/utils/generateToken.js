import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn,
        }
    );

    return {
        token,
        expiresIn,
    };
};