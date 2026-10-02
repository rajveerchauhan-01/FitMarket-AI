import FitnessProfile from "../../models/FitnessProfile.js";

const createFitnessProfile = async (userId, profileData) => {
  // A user should have only one fitness profile.
  const existingProfile = await FitnessProfile.findOne({ userId });

  if (existingProfile) {
    throw {
      status: 409,
      message: "Fitness profile already exists",
    };
  }

  // Attach the authenticated user's ID to the profile data.
  const profile = await FitnessProfile.create({
    userId,
    ...profileData,
  });

  return {
    success: true,
    message: "Profile created successfully",
    profile,
  };
};

export default createFitnessProfile;