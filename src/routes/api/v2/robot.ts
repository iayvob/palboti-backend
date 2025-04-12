import { Router } from "express";
import {
    createRobotController,
    deleteRobotController,
    getRobotByIdController,
    updateRobotController,
} from "@/controllers/robot-controller";
import {
    createRobotSchema,
    deleteRobotSchema,
    getRobotByIdSchema,
    updateRobotSchema,
} from "@/validations/robotSchema";
import validate from "express-zod-safe";

const router = Router();

// Create a new robot
router.post(
    "/",
    validate(createRobotSchema),
    createRobotController
);

// Get robot by ID
router.get(
    "/:robotId",
    validate(getRobotByIdSchema),
    getRobotByIdController
);

// Update robot
router.put(
    "/:robotId",
    validate(updateRobotSchema),
    updateRobotController
);

// Delete robot
router.delete(
    "/:robotId",
    validate(deleteRobotSchema),
    deleteRobotController
);

export default router;