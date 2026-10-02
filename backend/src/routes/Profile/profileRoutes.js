import express from "express"
import authMiddleware from "../../middlewares/authenticateUser.js";
import validateFitnessProfile from "../../middlewares/Profile/validateFitnessProfile.js";
import createFitnessProfileUser from "../../controllers/Profile/profileController.js";



const router = express.Router();


router.post(
    "/",
    authMiddleware,
    validateFitnessProfile,
    createFitnessProfileUser
);

export default router;