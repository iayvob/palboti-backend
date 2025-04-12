import { z } from "zod";

// ────────────────────────────────────────────────────────────────
// Create Product Schema
// ────────────────────────────────────────────────────────────────

export const createProductSchema = {
    body: z.object({
        userId: z.string().min(1, { message: "user id is required" }),
        category: z.string().min(1, { message: "Category is required" }),
        status: z.string().min(1, { message: "Status is required" }),
        stage: z.number(),
        location: z.string().min(1, { message: "Location is required" }),
        tags: z.array(z.string()).optional(),
    }),
};

export type CreateProductBody = z.infer<typeof createProductSchema.body>;

// ────────────────────────────────────────────────────────────────
// Delete Product Schema
// ────────────────────────────────────────────────────────────────

export const deleteProductSchema = {
    params: z.object({
        id: z.string().min(1, { message: "Product ID is required" }),
    }),
};

export type DeleteProductParams = z.infer<typeof deleteProductSchema.params>;

// ────────────────────────────────────────────────────────────────
// Update Product Schema
// ────────────────────────────────────────────────────────────────

export const updateProductSchema = {
    params: z.object({
        id: z.string().min(1, { message: "Product ID is required" }),
    }),
    body: z.object({
        name: z.string().optional(),
        category: z.string().optional(),
        status: z.string().optional(),
        location: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
};

export type UpdateProductParams = z.infer<typeof updateProductSchema.params>;
export type UpdateProductBody = z.infer<typeof updateProductSchema.body>;

// ────────────────────────────────────────────────────────────────
// Get Product Schema
// ────────────────────────────────────────────────────────────────

export const getProductSchema = {
    params: z.object({
        id: z.string().min(1, { message: "Product ID is required" }),
    }),
};

export type GetProductParams = z.infer<typeof getProductSchema.params>;

// ────────────────────────────────────────────────────────────────
// Get Products By User Schema
// ────────────────────────────────────────────────────────────────

export const getProductsByUserSchema = {
    params: z.object({
        email: z.string().email({ message: "Valid email is required" }),
    }),
};

export type GetProductsByUserParams = z.infer<typeof getProductsByUserSchema.params>;
