import register from "../services/authService.js";
import loginService from "../services/loginService.js";
import verifyOtp from "../services/verifyOtpService.js";
import verifyLoginOtp from "../services/verifyLoginOtpService.js"
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

const loginUser = async (req, res) => {
    try {
        const result = await loginService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}
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
}
const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export { registerUser, verifyOtpUser, loginUser, verifyLoginOtpUser, getCurrentUser };