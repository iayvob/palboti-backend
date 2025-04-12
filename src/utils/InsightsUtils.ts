import prisma from '../config/db/prisma';

export async function createInsight(
    userId: string,
    title: string,
    description: string,
    category: string,
    impact: string
) {
    try {
        const insight = await prisma.insight.create({
            data: {
                userId,
                title,
                description,
                category,
                impact,
            },
        });

        return { status: 200, message: "Insight Created", insight };
    } catch (error) {
        return { status: 500, error: "Failed to create insight: " + (error as string) };
    }
}

export async function deleteInsight(insightId: string) {
    try {
        await prisma.insight.delete({
            where: { id: insightId },
        });

        return { status: 200, message: "Insight Deleted" };
    } catch (error) {
        return { status: 500, error: "Failed to delete insight: " + (error as string) };
    }
}

export async function updateInsight(
    insightId: string,
    updates: Partial<{
        title: string;
        description: string;
        category: string;
        impact: string;
    }>
) {
    try {
        const insight = await prisma.insight.update({
            where: { id: insightId },
            data: updates,
        });

        return { status: 200, message: "Insight Updated", insight };
    } catch (error) {
        return { status: 500, error: "Failed to update insight: " + (error as string) };
    }
}

export async function getInsightById(insightId: string) {
    try {
        const insight = await prisma.insight.findUnique({
            where: { id: insightId },
        });

        if (insight) {
            return { status: 200, insight };
        } else {
            return { status: 404, error: "Insight not found" };
        }
    } catch (error) {
        return { status: 500, error: "Failed to retrieve insight: " + (error as string) };
    }
}

export async function getInsightsByCategory(category: string) {
    try {
        const insights = await prisma.insight.findMany({
            where: { category },
        });

        return { status: 200, insights };
    } catch (error) {
        return { status: 500, error: "Failed to retrieve insights: " + (error as string) };
    }
}
