import { Request, Response } from "express";
import { asyncWrapper } from "@/middleware/asyncWrapper";
import { createSlot, deleteSlot } from "@/utils/slotUtils";


export const createSlotController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { userId, stage, zone, productId } = req.body;

        const result = await createSlot(userId, stage, zone, productId);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);

export const deleteSlotController = asyncWrapper(
    async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        console.log("Deleting slot with ID:", id);

        const result = await deleteSlot(id);

        if (result.status === 200) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ error: result.error });
        }
    }
);

// export const updateSlotController = asyncWrapper(
//     async (req: Request, res: Response): Promise<void> => {
//         const { slotId } = req.params;
//         const updates = req.body;

//         const result = await updateSlot(slotId, updates);

//         if (result.status === 200) {
//             res.status(200).json(result);
//         } else {
//             res.status(result.status).json({ error: result.error });
//         }
//     }
// );

// export const getShelveByIdController = asyncWrapper(
//     async (req: Request, res: Response): Promise<void> => {
//         const { slotId } = req.params;

//         const result = await getSlotById(slotId);

//         if (result.status === 200) {
//             res.status(200).json(result);
//         } else {
//             res.status(result.status).json({ error: result.error });
//         }
//     }
// );

// export const getSlotByCategoryController = asyncWrapper(
//     async (req: Request, res: Response): Promise<void> => {
//         const { category } = req.query;

//         if (typeof category !== "string") {
//             res.status(400).json({ error: "Invalid category parameter" });
//             return;
//         }

//         const result = await getSlotByCategory(category);

//         if (result.status === 200) {
//             res.status(200).json(result);
//         } else {
//             res.status(result.status).json({ error: result.error });
//         }
//     }
// );