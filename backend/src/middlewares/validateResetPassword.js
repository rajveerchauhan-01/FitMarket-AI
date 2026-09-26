const validateResetPasswords = async (req, res, next) => {
    let password = req.body.newPassword;
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "new Password is required",
        });
    }
    if (typeof password !== "string") {
        return res.status(400).json({
            success: false,
            message: "Password should be a string ",
        });
    }
    password = password.trim();
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long",
        });
    }
    req.body.newPassword = password;
    next();
}

export default validateResetPasswords;