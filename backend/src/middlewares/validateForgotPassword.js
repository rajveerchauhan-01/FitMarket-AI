const validateForgotPassword = (req, res, next) => {
    let { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({
            success: false,
            message: "email or phone number is required"
        })
    }
    identifier = identifier.trim();

    if (identifier.includes("@")) {
        identifier = identifier.toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(identifier)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address",
            });
        }
    } else {
        if (!/^\d{10}$/.test(identifier)) {
            return res.status(400).json({
                success: false,
                message: "phone number must contain exactly 10 digits"
            })
        }
    }
    req.body.identifier = identifier;
    next();
}

export default validateForgotPassword;