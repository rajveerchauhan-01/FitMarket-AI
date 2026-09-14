import "dotenv/config";
import { sendEmail } from "./utils/sendEmail.js";

const testEmail = async () => {
    try {
        await sendEmail(
            "rajveerchauhan2003@gmail.com",
            "123456"
        );

        console.log("Test email sent successfully.");
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};

testEmail();