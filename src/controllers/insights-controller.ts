import { asyncWrapper } from "@/middleware/asyncWrapper";
import {
  createInsight,
  deleteInsight,
  updateInsight,
  getInsightById,
  getInsightsByCategory,
} from "@/utils/InsightsUtils";
import { Request, Response } from "express";

export const createInsightController = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { userId, title, description, category, impact } = req.body;

    const result = await createInsight(userId, title, description, category, impact);

    if (result?.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(result?.status ?? 400).json({ error: result?.error });
    }
  }
);

export const deleteInsightController = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await deleteInsight(id);

    if (result?.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(result?.status ?? 400).json({ error: result?.error });
    }
  }
);

export const updateInsightController = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;

    const result = await updateInsight(id, updates);

    if (result?.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(result?.status ?? 400).json({ error: result?.error });
    }
  }
);

export const getInsightController = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await getInsightById(id);

    if (result?.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(result?.status ?? 404).json({ error: result?.error });
    }
  }
);

export const getInsightsByCategoryController = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { category } = req.params;

    const result = await getInsightsByCategory(category);

    if (result?.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(result?.status ?? 404).json({ error: result?.error });
    }
  }
);
