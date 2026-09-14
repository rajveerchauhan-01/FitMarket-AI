

export const verifyOtp = async (req, res, next) => {
    let { identifier, otp } = req.body;
    identifier = identifier?.trim();
    if (!identifier) {
        return res.status(400).json({
            success: false,
            message: "Identifier is required"
        })
    }
    otp = otp?.trim();
    if (!otp) {
        return res.status(400).json({
            success: false,
            message: "otp is required"
        })
    } if (!/^\d{6}$/.test(otp)) {
        return res.status(400).json({
            success: false,
            message: "OTP must contain exactly 6 digits."
        });
    }

    next();


}