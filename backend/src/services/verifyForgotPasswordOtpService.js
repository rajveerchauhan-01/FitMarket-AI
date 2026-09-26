import OTP from "../models/Otp.js";
import User from "../models/User.js";
import { generateResetToken } from "../utils/generateResetToken.js";

const verifyForgotPassword = async (data) => {
    const { identifier, otp } = data;

    // Find the account using either the registered email or phone number.
    const user = await User.findOne({
        $or: [
            { email: identifier },
            { phone: identifier }
        ]
    });

    // Return a generic error so we don't reveal whether an account exists.
    if (!user) {
        throw {
            status: 400,
            message: "Invalid or expired OTP."
        };
    }

    // Find the OTP specifically created for the password-reset flow.
    const existingOtp = await OTP.findOne({
        userId: user._id,
        purpose: "forgot-password"
    });

    // No OTP means it was never requested, already used, or has been removed.
    if (!existingOtp) {
        throw {
            status: 400,
            message: "Invalid or expired OTP."
        };
    }

    // OTPs are valid only for a limited time. Remove expired OTPs immediately.
    if (existingOtp.expiresAt < new Date()) {
        await existingOtp.deleteOne();

        throw {
            status: 400,
            message: "OTP has expired. Please request a new OTP."
        };
    }

    // If the OTP is incorrect, increase the failed-attempt counter.
    if (existingOtp.otp !== otp) {
        existingOtp.attempts += 1;

        // Delete the OTP after 5 failed attempts to prevent unlimited guessing.
        if (existingOtp.attempts >= 5) {
            await existingOtp.deleteOne();

            throw {
                status: 400,
                message: "Too many failed attempts. Please request a new OTP."
            };
        }

        // Persist the failed attempt before returning the error.
        await existingOtp.save();

        throw {
            status: 400,
            message: `Invalid OTP. ${5 - existingOtp.attempts} attempt(s) remaining.`
        };
    }

    // Generate a short-lived token proving that the user passed OTP verification.
    // This token will be required by the reset-password endpoint.
    const { resetToken, expiresIn } = generateResetToken(user);

    // OTP is single-use, so remove it after successful verification.
    await existingOtp.deleteOne();

    return {
        success: true,
        message: "OTP verified successfully.",
        resetToken,
        expiresIn
    };
};

export default verifyForgotPassword;