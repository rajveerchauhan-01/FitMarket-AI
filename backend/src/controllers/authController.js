import register from "../services/authService.js";
import loginService from "../services/loginService.js";
import verifyOtp from "../services/verifyOtpService.js";
import verifyLoginOtp from "../services/verifyLoginOtpService.js";
import forgotPwService from "../services/forgotPasswordService.js";
import verifyForgotPasswordService from "../services/verifyForgotPasswordOtpService.js";
import resetPasswordService from "../services/resetPasswordService.js";

// Register a new user and send registration OTP.
const registerUser = async (req, res) => {
    try {
        const result = await register(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Verify the OTP sent during registration.
const verifyOtpUser = async (req, res) => {
    try {
        const result = await verifyOtp(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Authenticate user credentials and initiate login OTP verification.
const loginUser = async (req, res) => {
    try {
        const result = await loginService(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Verify the OTP sent during login and issue the authentication token.
const verifyLoginOtpUser = async (req, res) => {
    try {
        const result = await verifyLoginOtp(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Return the currently authenticated user's information.
const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Request a password reset OTP for an existing account.
const forgotPasswordUser = async (req, res) => {
    try {
        const result = await forgotPwService(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Verify the password reset OTP and generate a short-lived reset token.
const verifyForgotPasswordOtpUser = async (req, res) => {
    try {
        const result = await verifyForgotPasswordService(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Reset the user's password using the authenticated reset token.
const resetPasswordUser = async (req, res) => {
    try {
        const result = await resetPasswordService(
            req.user,
            req.body.newPassword
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export {
    registerUser,
    verifyOtpUser,
    loginUser,
    verifyLoginOtpUser,
    getCurrentUser,
    forgotPasswordUser,
    verifyForgotPasswordOtpUser,
    resetPasswordUser,
};