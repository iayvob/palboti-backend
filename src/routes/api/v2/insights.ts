import { Router } from "express";
import {
    createInsightController,
    deleteInsightController,
    getInsightController,
    getInsightsByCategoryController,
    updateInsightController,
} from "@/controllers/insights-controller";
import {
    createInsightSchema,
    deleteInsightSchema,
    getInsightSchema,
    getInsightsByCategorySchema,
    updateInsightSchema,
} from "@/validations/insightSchema";
import validate from "express-zod-safe";

const router = Router();

// Create a new insight
router.post(
    "/",
    validate(createInsightSchema),
    createInsightController
);

// Get insight by ID
router.get(
    "/:id",
    validate(getInsightSchema),
    getInsightController
);

// Get insights by category
router.get(
    "/category/:category",
    validate(getInsightsByCategorySchema),
    getInsightsByCategoryController
);

// Update insight
router.put(
    "/:id",
    validate(updateInsightSchema),
    updateInsightController
);

// Delete insight
router.delete(
    "/:id",
    validate(deleteInsightSchema),
    deleteInsightController
);

export default router;