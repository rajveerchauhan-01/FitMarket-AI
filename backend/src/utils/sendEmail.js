import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
    console.log("📧 sendEmail() called");
    console.log("Recipient:", to);
    console.log("OTP:", otp);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    console.log("📧 Transporter created");

    const info = await transporter.sendMail({
        from: `"FitMarket AI" <${process.env.EMAIL_USER}>`,
        to,
        subject: "FitMarket AI - Verify Your Email",

        text: `Your FitMarket AI verification OTP is: ${otp}

This OTP is valid for 5 minutes.

If you did not request this verification code, please ignore this email.`,

        html: `
            <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px 20px;">
                <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:12px; padding:35px; text-align:center;">
                    <h1 style="color:#222;">FitMarket AI</h1>

                    <p style="color:#555;">
                        Verify your email address
                    </p>

                    <p style="color:#555;">
                        Use the verification code below to complete your registration.
                    </p>

                    <div style="margin:30px 0; padding:18px; background:#f1f3f5; border-radius:8px;">
                        <span style="font-size:32px; font-weight:bold; letter-spacing:8px;">
                            ${otp}
                        </span>
                    </div>

                    <p style="color:#666;">
                        This OTP is valid for <strong>5 minutes</strong>.
                    </p>

                    <p style="color:#999; font-size:12px;">
                        If you didn't request this verification code,
                        you can safely ignore this email.
                    </p>

                    <hr style="border:none; border-top:1px solid #eee;">

                    <p style="color:#aaa; font-size:11px;">
                        © FitMarket AI
                    </p>
                </div>
            </div>
        `,
    });

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);
};