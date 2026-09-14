import OTP from "../models/Otp.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";

const loginService = async (data) => {
    const { identifier, password } = data;

    // --------------------------------------------------
    // 1. Find the user using email OR phone
    // --------------------------------------------------

    const user = await User.findOne({
        $or: [
            { email: identifier },
            { phone: identifier }
        ]
    });

    // Don't reveal whether the email/phone exists
    if (!user) {
        throw {
            status: 401,
            message: "Invalid email/phone or password"
        };
    }

    // --------------------------------------------------
    // 2. Compare the entered password with the
    //    hashed password stored in MongoDB
    // --------------------------------------------------

    const passwordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatched) {
        throw {
            status: 401,
            message: "Invalid email/phone or password"
        };
    }

    // --------------------------------------------------
    // 3. Generate a new 6-digit OTP
    // --------------------------------------------------

    const otp = String(
        Math.floor(Math.random() * 900000) + 100000
    );

    // OTP will remain valid for 5 minutes
    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    // --------------------------------------------------
    // 4. Check whether a pending OTP already exists
    //    for this user
    // --------------------------------------------------

    const existingOtp = await OTP.findOne({
        userId: user._id,
        purpose: "login"
    });

    // --------------------------------------------------
    // 5. Update existing OTP OR create a new one
    // --------------------------------------------------

    if (existingOtp) {

        existingOtp.otp = otp;
        existingOtp.expiresAt = expiresAt;
        existingOtp.attempts = 0;

        await existingOtp.save();

    } else {

        await OTP.create({
            identifier: user.email,
            userId: user._id,
            otp,
            purpose: "login",
            expiresAt,
            attempts: 0
        });
    }

    // --------------------------------------------------
    // 6. Send OTP to the user's verified email
    // --------------------------------------------------

    await sendEmail(user.email, otp);

    // --------------------------------------------------
    // 7. Tell the client that OTP verification is
    //    required before creating the JWT
    // --------------------------------------------------

    return {
        success: true,
        message: "OTP sent successfully. Please verify to complete login."
    };
};

export default loginService;