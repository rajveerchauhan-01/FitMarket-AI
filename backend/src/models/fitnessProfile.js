import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bodyStats: {
      age: {
        type: Number,
        required: true,
        min: 13,
        max: 100,
      },

      height: {
        type: Number,
        required: true,
        min: 50,
        max: 250,
      },

      weight: {
        type: Number,
        required: true,
        min: 20,
        max: 300,
      },

      chest: {
        type: Number,
        min: 20,
        max: 200,
      },

      waist: {
        type: Number,
        min: 20,
        max: 200,
      },

      arms: {
        type: Number,
        min: 10,
        max: 100,
      },

      thighs: {
        type: Number,
        min: 20,
        max: 150,
      },
    },

    goal: {
      type: String,
      required: true,
      enum: [
        "fat-loss",
        "muscle-gain",
        "maintenance",
        "general-fitness",
      ],
    },

    activityLevel: {
      type: String,
      required: true,
      enum: [
        "low",
        "moderate",
        "high",
      ],
    },

    trainingExperience: {
      type: String,
      required: true,
      enum: [
        "beginner",
        "intermediate",
        "advanced",
      ],
    },

    dietPreference: {
      type: String,
      required: true,
      enum: [
        "vegetarian",
        "non-vegetarian",
        "vegan",
        "eggetarian",
      ],
    },

    foodItems: {
      type: [String],
      default: [],
    },

    occupation: {
      type: String,
      required: true,
      trim: true,
    },

    constraints: {
      budget: {
        type: Number,
        min: 0,
      },

      allergies: {
        type: [String],
        default: [],
      },

      otherRestrictions: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

const FitnessProfile = mongoose.model("FitnessProfile", profileSchema);

export default FitnessProfile;