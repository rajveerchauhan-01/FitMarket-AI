import bcrypt from "bcrypt"

const resetPassword = async (user, newPassword) => {
    let hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save()

    return {
        success: true,
        message: "Password reset successfully "
    }
}

export default resetPassword;