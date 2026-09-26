import express from "express";

import { verifyOtp } from "../middlewares/validateVerifyOtp.js";
import validateRegister from "../middlewares/validateRegister.js";
import { loginUser, registerUser, verifyLoginOtpUser, verifyOtpUser, getCurrentUser, forgotPasswordUser, verifyForgotPasswordOtpUser, resetPasswordUser } from "../controllers/authController.js";
import validateLogin from "../middlewares/validateLogin.js";
import authMiddleware from "../middlewares/authenticateUser.js";
import authenticateResetToken from "../middlewares/authenticateResetToken.js"

import validateForgotPassword from "../middlewares/validateForgotPassword.js"

import validateResetPassword from "../middlewares/validateResetPassword.js"

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/verify-otp", verifyOtp, verifyOtpUser)
router.post("/login", validateLogin, loginUser)
router.post("/verify-login-otp", verifyOtp, verifyLoginOtpUser);
router.get("/me", authMiddleware, getCurrentUser);
router.post(
    "/forgot-password",
    validateForgotPassword,
    forgotPasswordUser
);
router.post(
    "/verify-forgot-password-otp",
    verifyOtp,
    verifyForgotPasswordOtpUser
);
router.post(
    "/reset-password",
    validateResetPassword,
    authenticateResetToken,
    resetPasswordUser
);
export default router;