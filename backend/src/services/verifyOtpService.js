import OTP from "../models/Otp.js";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js"

const verifyOtp = async (data) => {
    const { identifier, otp } = data;

    // Find OTP document
    const otpDoc = await OTP.findOne({ identifier });

    if (!otpDoc) {
        throw {
            status: 400,
            message: "Invalid or expired OTP. Please request a new OTP.",
        };
    }

    // Safety check (TTL cleanup is not immediate)
    if (otpDoc.expiresAt < new Date()) {
        await otpDoc.deleteOne();

        throw {
            status: 400,
            message: "OTP has expired. Please request a new OTP.",
        };
    }

    // Verify OTP
    if (otpDoc.otp !== otp) {
        otpDoc.attempts += 1;

        if (otpDoc.attempts >= 5) {
            await otpDoc.deleteOne();

            throw {
                status: 400,
                message:
                    "Too many failed attempts. Please request a new OTP.",
            };
        }

        await otpDoc.save();

        throw {
            status: 400,
            message: `Invalid OTP. ${5 - otpDoc.attempts
                } attempt(s) remaining.`,
        };
    }

    // Create verified user
    const user = await User.create({
        firstName: otpDoc.firstName,
        lastName: otpDoc.lastName,
        email: otpDoc.email,
        phone: otpDoc.phone,
        password: otpDoc.password,
        isVerified: true
    });

    //JWT
    const { token, expiresIn } = generateToken(user);
    // Delete OTP after successful verification
    await otpDoc.deleteOne();

    return {
        success: true,
        message: "OTP verified successfully.",
        token,
        expiresIn,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
    };
};

export default verifyOtp;