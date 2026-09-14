import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: function () {
                return this.purpose === "login";
            }
        },

        identifier: {
            type: String,
            required: [true, "Identifier is required"],
            trim: true,
        },

        firstName: {
            type: String,
            required: function () {
                return this.purpose === "register";
            },
            trim: true,
        },

        lastName: {
            type: String,
            required: function () {
                return this.purpose === "register";
            },
            trim: true,
        },

        email: {
            type: String,
            required: function () {
                return this.purpose === "register";
            },
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: function () {
                return this.purpose === "register";
            },
            trim: true,
            match: [
                /^\d{10}$/,
                "Phone number must contain exactly 10 digits"
            ],
        },

        password: {
            type: String,
            required: function () {
                return this.purpose === "register";
            },
        },

        otp: {
            type: String,
            required: [true, "OTP is required"],
        },

        purpose: {
            type: String,
            enum: ["register", "login", "forgot-password"],
            default: "register",
        },

        attempts: {
            type: Number,
            default: 0,
        },

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Automatically delete expired OTPs
otpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;