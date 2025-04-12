import { Router } from "express";
import validate from "express-zod-safe";
import { createSlotController, deleteSlotController } from "@/controllers/slot-controller";
import { createSlotSchema, deleteSlotSchema } from "@/validations/slotSchema";

const router = Router();

// Create a new shelve
router.post(
    "/",
    validate(createSlotSchema),
    createSlotController
);

// // Get shelve by ID
// router.get(
//     "/:id",
//     validate(getShelveByIdSchema),
//     getSheController
// );

// // Get shelves by category
// router.get(
//     "/category/:category",
//     validate(getShelvesByCategorySchema),
//     getShelvesByCategoryController
// );

// // Update shelve
// router.put(
//     "/:id",
//     validate(updateShelveSchema),
//     updateShelveController
// );

// Delete shelve
router.delete(
    "/:id",
    validate(deleteSlotSchema),
    deleteSlotController
);

export default router;