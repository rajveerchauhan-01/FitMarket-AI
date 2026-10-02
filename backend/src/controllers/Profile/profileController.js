import createFitnessProfile from "../../services/Profile/fitnessProfileService.js";

const createFitnessProfileUser = async (req, res) => {
    try {
        const result = await createFitnessProfile(
            req.user._id,
            req.body
        );

        return res.status(201).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export default createFitnessProfileUser;