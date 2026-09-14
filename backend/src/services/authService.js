import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";
import OTP from "../models/Otp.js";

const register = async (data) => {
    const { firstName, lastName, email, phone, password } = data;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw {
            status: 409,
            message: "Email already exists.",
        };
    }

    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
        throw {
            status: 409,
            message: "Phone number already exists.",
        };
    }

    const otp = String(
        Math.floor(Math.random() * 900000) + 100000
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    const existingOtp = await OTP.findOne({
        identifier: email,
    });

    if (existingOtp) {
        existingOtp.firstName = firstName;
        existingOtp.lastName = lastName;
        existingOtp.email = email;
        existingOtp.phone = phone;
        existingOtp.password = hashedPassword;
        existingOtp.otp = otp;
        existingOtp.expiresAt = expiresAt;
        existingOtp.attempts = 0;

        await existingOtp.save();
    } else {
        await OTP.create({
            identifier: email,
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            otp,
            expiresAt,
        });
    }
    console.log("📧 About to send OTP email");

    await sendEmail(email, otp);

    console.log("📧 sendEmail completed");

    return {
        success: true,
        message: "OTP sent successfully.",
    };
};

export default register;