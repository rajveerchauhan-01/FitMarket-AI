import OTP from "../models/Otp.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

const forgotPwService = async (data) => {
  const { identifier } = data;

  const user = await User.findOne({
    $or: [
      { email: identifier },
      { phone: identifier }
    ]
  });

  const genericResponse = {
    success: true,
    message: "If an account exists, an OTP has been sent."
  };

  if (!user) {
    return genericResponse;
  }

  const otp = String(
    Math.floor(Math.random() * 900000) + 100000
  );

  const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
  );

  const existingOtp = await OTP.findOne({
    userId: user._id,
    purpose: "forgot-password"
  });

  if (existingOtp) {
    existingOtp.otp = otp;
    existingOtp.expiresAt = expiresAt;
    existingOtp.attempts = 0;

    await existingOtp.save();
  } else {
    await OTP.create({
      userId: user._id,
      identifier: user.email,
      otp,
      purpose: "forgot-password",
      attempts: 0,
      expiresAt
    });
  }

  await sendEmail(user.email, otp);

  return genericResponse;
};

export default forgotPwService;