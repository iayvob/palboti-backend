// ────────────────────────────────────────────────────────────────
// Create Notification Schema
// ────────────────────────────────────────────────────────────────

import { z } from "zod";

export const createNotification = {
    body: z.object({
        email: z.string().min(1, { message: "Email is required" }),
        type: z.enum([
            "email_validation",
            "password_reset",
            "alert",
            "mission_completed",
            "mission_incomplete"
        ]),
    }),
};

export type createNotificationBody = z.infer<typeof createNotification.body>;