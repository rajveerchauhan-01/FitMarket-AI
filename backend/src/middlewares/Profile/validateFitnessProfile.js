const validateFitnessProfile = (req, res, next) => {
    const {
        bodyStats,
        goal,
        activityLevel,
        trainingExperience,
        dietPreference,
        foodItems,
        occupation,
        constraints,
    } = req.body;

    // ---------- Helper functions ----------

    const isValidNumber = (value) =>
        typeof value === "number" && Number.isFinite(value);

    const isValidString = (value) =>
        typeof value === "string" && value.trim().length > 0;

    const isValidStringArray = (value) =>
        Array.isArray(value) &&
        value.every(
            (item) => typeof item === "string" && item.trim().length > 0
        );

    const isInRange = (value, min, max) =>
        isValidNumber(value) && value >= min && value <= max;

    // ---------- Body Stats ----------

    if (!bodyStats || typeof bodyStats !== "object") {
        return res.status(400).json({
            success: false,
            message: "Body stats are required.",
        });
    }

    const requiredBodyStats = {
        age: [13, 100],
        height: [50, 250],
        weight: [20, 300],
    };

    for (const [field, [min, max]] of Object.entries(requiredBodyStats)) {
        if (!isInRange(bodyStats[field], min, max)) {
            return res.status(400).json({
                success: false,
                message: `${field} must be a valid number between ${min} and ${max}.`,
            });
        }
    }

    // Optional body measurements
    const optionalMeasurements = {
        chest: [20, 200],
        waist: [20, 200],
        arms: [10, 100],
        thighs: [20, 150],
    };

    for (const [field, [min, max]] of Object.entries(optionalMeasurements)) {
        if (
            bodyStats[field] !== undefined &&
            !isInRange(bodyStats[field], min, max)
        ) {
            return res.status(400).json({
                success: false,
                message: `${field} must be between ${min} and ${max}.`,
            });
        }
    }

    // ---------- Enum fields ----------

    const allowedGoals = [
        "fat-loss",
        "muscle-gain",
        "maintenance",
        "general-fitness",
    ];

    if (!allowedGoals.includes(goal)) {
        return res.status(400).json({
            success: false,
            message: "Invalid fitness goal.",
        });
    }

    const allowedActivityLevels = [
        "low",
        "moderate",
        "high",
    ];

    if (!allowedActivityLevels.includes(activityLevel)) {
        return res.status(400).json({
            success: false,
            message: "Invalid activity level.",
        });
    }

    const allowedTrainingExperience = [
        "beginner",
        "intermediate",
        "advanced",
    ];

    if (!allowedTrainingExperience.includes(trainingExperience)) {
        return res.status(400).json({
            success: false,
            message: "Invalid training experience.",
        });
    }

    const allowedDietPreferences = [
        "vegetarian",
        "non-vegetarian",
        "vegan",
        "eggetarian",
    ];

    if (!allowedDietPreferences.includes(dietPreference)) {
        return res.status(400).json({
            success: false,
            message: "Invalid diet preference.",
        });
    }

    // ---------- Food Items ----------

    if (
        foodItems !== undefined &&
        !isValidStringArray(foodItems)
    ) {
        return res.status(400).json({
            success: false,
            message: "Food items must be an array of strings.",
        });
    }

    // ---------- Occupation ----------

    if (!isValidString(occupation)) {
        return res.status(400).json({
            success: false,
            message: "Occupation is required.",
        });
    }

    // ---------- Constraints ----------

    if (constraints !== undefined) {
        if (
            typeof constraints !== "object" ||
            Array.isArray(constraints)
        ) {
            return res.status(400).json({
                success: false,
                message: "Constraints must be an object.",
            });
        }

        if (
            constraints.budget !== undefined &&
            (!isValidNumber(constraints.budget) ||
                constraints.budget < 0)
        ) {
            return res.status(400).json({
                success: false,
                message: "Budget must be a valid positive number.",
            });
        }

        if (
            constraints.allergies !== undefined &&
            !isValidStringArray(constraints.allergies)
        ) {
            return res.status(400).json({
                success: false,
                message: "Allergies must be an array of strings.",
            });
        }

        if (
            constraints.otherRestrictions !== undefined &&
            !isValidStringArray(constraints.otherRestrictions)
        ) {
            return res.status(400).json({
                success: false,
                message: "Other restrictions must be an array of strings.",
            });
        }
    }

    next();
};

export default validateFitnessProfile;