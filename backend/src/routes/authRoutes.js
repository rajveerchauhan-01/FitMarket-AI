import express from "express";

import { verifyOtp } from "../middlewares/validateVerifyOtp.js";
import validateRegister from "../middlewares/validateRegister.js";
import { loginUser, registerUser, verifyLoginOtpUser, verifyOtpUser, getCurrentUser } from "../controllers/authController.js";
import validateLogin from "../middlewares/validateLogin.js";
import authMiddleware from "../middlewares/authenticateUser.js";


const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/verify-otp", verifyOtp, verifyOtpUser)
router.post("/login", validateLogin, loginUser)
router.post("/verify-login-otp", verifyOtp, verifyLoginOtpUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;