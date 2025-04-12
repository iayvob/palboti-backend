import { z } from "zod";

// ────────────────────────────────────────────────────────────────
// Create Robot Schema
// ────────────────────────────────────────────────────────────────

export const createRobotSchema = {
    body: z.object({
        name: z.string().min(1, { message: "Robot name is required" }),
        location: z.string().min(1, { message: "Location is required" }),
    }),
};

export type CreateRobotBody = z.infer<typeof createRobotSchema.body>;

// ────────────────────────────────────────────────────────────────
// Delete Robot Schema
// ────────────────────────────────────────────────────────────────

export const deleteRobotSchema = {
    params: z.object({
        robotId: z.string().min(1, { message: "Robot ID is required" }),
    }),
};

export type DeleteRobotParams = z.infer<typeof deleteRobotSchema.params>;

// ────────────────────────────────────────────────────────────────
// Update Robot Schema
// ────────────────────────────────────────────────────────────────

export const updateRobotSchema = {
    params: z.object({
        robotId: z.string().min(1, { message: "Robot ID is required" }),
    }),
    body: z.object({
        name: z.string().optional(),
        location: z.string().optional(),
        charge: z.number().min(0).optional(),
    }),
};

export type UpdateRobotParams = z.infer<typeof updateRobotSchema.params>;
export type UpdateRobotBody = z.infer<typeof updateRobotSchema.body>;

// ────────────────────────────────────────────────────────────────
// Get Robot By ID Schema
// ────────────────────────────────────────────────────────────────

export const getRobotByIdSchema = {
    params: z.object({
        robotId: z.string().min(1, { message: "Robot ID is required" }),
    }),
};

export type GetRobotByIdParams = z.infer<typeof getRobotByIdSchema.params>;

// ────────────────────────────────────────────────────────────────
// Get Robots By User Schema
// ────────────────────────────────────────────────────────────────

export const getRobotsByUserSchema = {
    query: z.object({
        email: z.string().email({ message: "Valid email is required" }),
    }),
};

export type GetRobotsByUserQuery = z.infer<typeof getRobotsByUserSchema.query>;
