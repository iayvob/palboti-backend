import { z } from "zod";

// ────────────────────────────────────────────────────────────────
// Create Insight Schema
// ────────────────────────────────────────────────────────────────

export const createInsightSchema = {
  body: z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    impact: z.number().min(1, { message: "Impact must be at least 1" }),
  }),
};

export type CreateInsightBody = z.infer<typeof createInsightSchema.body>;

// ────────────────────────────────────────────────────────────────
// Update Insight Schema
// ────────────────────────────────────────────────────────────────

export const updateInsightSchema = {
  params: z.object({
    id: z.string().min(1, { message: "Insight ID is required" }),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    impact: z.number().optional(),
  }),
};

export type UpdateInsightParams = z.infer<typeof updateInsightSchema.params>;
export type UpdateInsightBody = z.infer<typeof updateInsightSchema.body>;

// ────────────────────────────────────────────────────────────────
// Get Insight Schema
// ────────────────────────────────────────────────────────────────

export const getInsightSchema = {
  params: z.object({
    id: z.string().min(1, { message: "Insight ID is required" }),
  }),
};

export type GetInsightParams = z.infer<typeof getInsightSchema.params>;

// ────────────────────────────────────────────────────────────────
// Get Insights By Category Schema
// ────────────────────────────────────────────────────────────────

export const getInsightsByCategorySchema = {
  params: z.object({
    category: z.string().min(1, { message: "Category is required" }),
  }),
};

export type GetInsightsByCategoryParams = z.infer<typeof getInsightsByCategorySchema.params>;

// ────────────────────────────────────────────────────────────────
// Delete Insight Schema
// ────────────────────────────────────────────────────────────────

export const deleteInsightSchema = {
  params: z.object({
    id: z.string().min(1, { message: "Insight ID is required" }),
  }),
};

export type DeleteInsightParams = z.infer<typeof deleteInsightSchema.params>;
