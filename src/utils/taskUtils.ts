import prisma from "@/config/db/prisma";

export async function createTask(
    email: string,
    name: string,
    description: string,
    status: string,
    updatedAt?: string,
) {
    const normalizedIdentifier = email.toLowerCase();

    const user = await prisma.user.findFirst({
        where: { email: normalizedIdentifier }
    });

    if (!user) {
        return { status: 404, error: "Cannot find user" };
    }

    const task = await prisma.task.create({
        data: {
            userId: user.id,
            email: normalizedIdentifier,
            name,
            description,
            status,
            updatedAt,
        }
    });

    if (task) {
        return { status: 200, message: "Task Created", task };
    } else {
        return { status: 500, error: "Failed to create task" };
    }
}

export async function deleteTask(taskId: string) {
    try {
        const result = await prisma.task.delete({
            where: { id: taskId },
        });

        if (result) {
            return { status: 200, message: "Task Deleted" };
        }
    } catch (error) {
        return { status: 500, error: "Failed to delete task: " + error as string };
    }
}

export async function updateTask(
    taskId: string,
    updates: Partial<{
        title: string;
        description: string;
        status: string;
        dueDate: string;
        tags: string[];
    }>
) {
    try {
        const task = await prisma.task.update({
            where: { id: taskId },
            data: updates,
        });

        return { status: 200, message: "Task Updated", task };
    } catch (error) {
        return { status: 500, error: "Failed to update task: " + error as string };
    }
}

export async function getTaskById(taskId: string) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
    });

    if (task) {
        return { status: 200, task };
    } else {
        return { status: 404, error: "Task not found" };
    }
}

export async function getTasksByUser(email: string) {
    const normalizedIdentifier = email.toLowerCase();
    const user = await prisma.user.findFirst({
        where: { email: normalizedIdentifier }
    });

    if (!user) {
        return { status: 404, error: "Cannot find user" };
    }

    const tasks = await prisma.task.findMany({
        where: { userId: user.id },
    });

    return { status: 200, tasks };
}