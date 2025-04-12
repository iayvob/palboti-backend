import { Request, Response } from "express";
import { asyncWrapper } from "@/middleware/asyncWrapper";
import {
    createTask,
    deleteTask,
    updateTask,
    getTaskById,
    getTasksByUser,
} from "@/utils/taskUtils";

export const createTaskController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { email, name, description, status, updatedAt } = req.body;

        const result = await createTask(email, name, description, status, updatedAt);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);

export const deleteTaskController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { taskId } = req.params;

        const result = await deleteTask(taskId);

        if (result?.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result?.status ?? 500).json({ error: result?.error });
        }
    }
);

export const updateTaskController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { taskId } = req.params;
        const updates = req.body;

        const result = await updateTask(taskId, updates);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);

export const getTaskByIdController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { taskId } = req.params;

        const result = await getTaskById(taskId);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);

export const getTasksByUserController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { email } = req.query;

        if (typeof email !== "string") {
            res.status(400).json({ error: "Invalid email parameter" });
            return;
        }

        const result = await getTasksByUser(email);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);
