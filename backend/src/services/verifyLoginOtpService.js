import OTP from "../models/Otp.js";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const verifyLoginOtp = async (data) => {
    const { identifier, otp } = data;

    // --------------------------------------------------
    // 1. Find the existing user using email OR phone
    // --------------------------------------------------
    const user = await User.findOne({
        $or: [
            { email: identifier },
            { phone: identifier }
        ]
    });

    if (!user) {
        throw {
            status: 400,
            message: "Invalid or expired login OTP."
        };
    }

    // --------------------------------------------------
    // 2. Find the login OTP belonging to this user
    // --------------------------------------------------
    const existingOtpDoc = await OTP.findOne({
        userId: user._id,
        purpose: "login"
    });

    if (!existingOtpDoc) {
        throw {
            status: 400,
            message: "Invalid or expired OTP."
        };
    }

    // --------------------------------------------------
    // 3. Check OTP expiration
    // --------------------------------------------------
    if (existingOtpDoc.expiresAt < new Date()) {
        await existingOtpDoc.deleteOne();

        throw {
            status: 400,
            message: "OTP has expired. Please login again to request a new OTP."
        };
    }

    // --------------------------------------------------
    // 4. Check submitted OTP
    // --------------------------------------------------
    if (otp !== existingOtpDoc.otp) {

        existingOtpDoc.attempts += 1;

        // Delete OTP after 5 failed attempts
        if (existingOtpDoc.attempts >= 5) {
            await existingOtpDoc.deleteOne();

            throw {
                status: 400,
                message:
                    "Too many failed attempts. Please login again to request a new OTP."
            };
        }

        await existingOtpDoc.save();

        throw {
            status: 400,
            message:
                `Invalid OTP. ${5 - existingOtpDoc.attempts} attempt(s) remaining.`
        };
    }

    // --------------------------------------------------
    // 5. OTP is correct → generate JWT
    // --------------------------------------------------
    const { token, expiresIn } = generateToken(user);

    // --------------------------------------------------
    // 6. Delete OTP because it has been successfully used
    // --------------------------------------------------
    await existingOtpDoc.deleteOne();

    // --------------------------------------------------
    // 7. Return authentication result
    // --------------------------------------------------
    return {
        success: true,
        message: "Login successful.",
        token,
        expiresIn,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    };
};

export default verifyLoginOtp;