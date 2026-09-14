const validateLogin = (req, res, next) => {
    let { identifier, password } = req.body;

    if (!identifier) {
        return res.status(400).json({
            success: false,
            message: "Email or phone number is required"
        })
    }
    identifier = identifier.trim();

    // Email
    if (identifier.includes("@")) {
        identifier = identifier.toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(identifier)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address",
            });
        }

    }
    else {    // Phone

        if (!/^\d{10}$/.test(identifier)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must contain exactly 10 digits",
            });
        }
    }


    // Password
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required",
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long",
        });
    }

    next();
};

export default validateLogin;
