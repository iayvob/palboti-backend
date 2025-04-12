import { z } from "zod";

// ────────────────────────────────────────────────────────────────
// Create Task Schema
// ────────────────────────────────────────────────────────────────

export const createTaskSchema = {
    body: z.object({
        email: z.string().email({ message: "Valid email is required" }),
        name: z.string().min(1, { message: "Task name is required" }),
        description: z.string().optional(),
        status: z.string().min(1, { message: "Status is required" }),
        updatedAt: z.string().optional(),
    }),
};

export type CreateTaskBody = z.infer<typeof createTaskSchema.body>;

// ────────────────────────────────────────────────────────────────
// Delete Task Schema
// ────────────────────────────────────────────────────────────────

export const deleteTaskSchema = {
    params: z.object({
        taskId: z.string().min(1, { message: "Task ID is required" }),
    }),
};

export type DeleteTaskParams = z.infer<typeof deleteTaskSchema.params>;

// ────────────────────────────────────────────────────────────────
// Update Task Schema
// ────────────────────────────────────────────────────────────────

export const updateTaskSchema = {
    params: z.object({
        taskId: z.string().min(1, { message: "Task ID is required" }),
    }),
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
        updatedAt: z.string().optional(),
    }),
};

export type UpdateTaskParams = z.infer<typeof updateTaskSchema.params>;
export type UpdateTaskBody = z.infer<typeof updateTaskSchema.body>;

// ────────────────────────────────────────────────────────────────
// Get Task By ID Schema
// ────────────────────────────────────────────────────────────────

export const getTaskByIdSchema = {
    params: z.object({
        taskId: z.string().min(1, { message: "Task ID is required" }),
    }),
};

export type GetTaskByIdParams = z.infer<typeof getTaskByIdSchema.params>;

// ────────────────────────────────────────────────────────────────
// Get Tasks By User Schema
// ────────────────────────────────────────────────────────────────

export const getTasksByUserSchema = {
    query: z.object({
        email: z.string().email({ message: "Valid email is required" }),
    }),
};

export type GetTasksByUserQuery = z.infer<typeof getTasksByUserSchema.query>;
