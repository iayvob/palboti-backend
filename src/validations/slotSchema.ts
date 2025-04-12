import { z } from "zod";

// ────────────────────────────────────────────────────────────────
// Create Shelve Schema
// ────────────────────────────────────────────────────────────────

export const createSlotSchema = {
    body: z.object({
        userId: z.string().min(1, { message: "userId is required" }),
        stage: z.number(),
        zone: z.string().min(1, { message: "zone is required" }),
        productId: z.string().min(1, { message: "productId is required" }),
    }),
};

export type CreateSlotBody = z.infer<typeof createSlotSchema.body>;

// ────────────────────────────────────────────────────────────────
// Delete Slot Schema
// ────────────────────────────────────────────────────────────────

export const deleteSlotSchema = {
    params: z.object({
        id: z.string().min(1, { message: "Slot ID is required" }),
    }),
};

export type DeleteSlotParams = z.infer<typeof deleteSlotSchema.params>;

// ────────────────────────────────────────────────────────────────
// Update Shelve Schema
// ────────────────────────────────────────────────────────────────

export const updateShelveSchema = {
    params: z.object({
        id: z.string().min(1, { message: "Shelve ID is required" }),
    }),
    body: z.object({
        name: z.string().optional(),
        category: z.string().optional(),
        status: z.string().optional(),
        location: z.string().optional(),
    }),
};

export type UpdateShelveParams = z.infer<typeof updateShelveSchema.params>;
export type UpdateShelveBody = z.infer<typeof updateShelveSchema.body>;

// ────────────────────────────────────────────────────────────────
// Get Shelve By ID Schema
// ────────────────────────────────────────────────────────────────

export const getShelveByIdSchema = {
    params: z.object({
        id: z.string().min(1, { message: "Shelve ID is required" }),
    }),
};

export type GetShelveByIdParams = z.infer<typeof getShelveByIdSchema.params>;

// ────────────────────────────────────────────────────────────────
// Get Shelves By Category Schema
// ────────────────────────────────────────────────────────────────

export const getShelvesByCategorySchema = {
    params: z.object({
        category: z.string().min(1, { message: "Category is required" }),
    }),
};

export type GetShelvesByCategoryParams = z.infer<typeof getShelvesByCategorySchema.params>;
