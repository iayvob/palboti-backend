import { Router } from "express";
import {
    createTaskController,
    deleteTaskController,
    getTaskByIdController,
    getTasksByUserController,
    updateTaskController,
} from "@/controllers/task-controller";
import {
    createTaskSchema,
    deleteTaskSchema,
    getTaskByIdSchema,
    getTasksByUserSchema,
    updateTaskSchema,
} from "@/validations/taskSchema";
import validate from "express-zod-safe";

const router = Router();

// Create a new task
router.post(
    "/",
    validate(createTaskSchema),
    createTaskController
);

// Get task by ID
router.get(
    "/:taskId",
    validate(getTaskByIdSchema),
    getTaskByIdController
);

// Get tasks by user
router.get(
    "/",
    validate(getTasksByUserSchema),
    getTasksByUserController
);

// Update task
router.put(
    "/:taskId",
    validate(updateTaskSchema),
    updateTaskController
);

// Delete task
router.delete(
    "/:taskId",
    validate(deleteTaskSchema),
    deleteTaskController
);

export default router;