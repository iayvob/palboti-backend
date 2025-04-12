import { createRobot, deleteRobot, getRobotById, updateRobot } from "@/utils/robotUtils";
import { Request, Response } from "express";
import { asyncWrapper } from "@/middleware/asyncWrapper";

export const createRobotController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { name, location } = req.body;

        const result = await createRobot(name, location);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);

export const deleteRobotController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { robotId } = req.params;

        const result = await deleteRobot(robotId);

        if (result?.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result?.status ?? 500).json({ error: result?.error });
        }
    }
);

export const updateRobotController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { robotId } = req.params;
        const updates = req.body;

        const result = await updateRobot(robotId, updates);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);

export const getRobotByIdController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { robotId } = req.params;

        const result = await getRobotById(robotId);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);