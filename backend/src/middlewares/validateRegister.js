const validateRegister = (req, res, next) => {
    let { firstName, lastName, email, phone, password } = req.body;

    // Trim all string inputs
    firstName = firstName?.trim();
    lastName = lastName?.trim();
    email = email?.trim().toLowerCase();
    phone = phone?.trim();

    // First Name
    if (!firstName) {
        return res.status(400).json({
            success: false,
            message: "First name is required",
        });
    }

    // Last Name
    if (!lastName) {
        return res.status(400).json({
            success: false,
            message: "Last name is required",
        });
    }

    // Email
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address",
        });
    }

    // Phone
    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "Phone number is required",
        });
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({
            success: false,
            message: "Phone number must contain exactly 10 digits",
        });
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

export default validateRegister;




/*
In production, we usually use libraries such as:
- express-validator
- Zod
- Joi
 */