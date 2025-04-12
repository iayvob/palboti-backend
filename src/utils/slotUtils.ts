import prisma from '../config/db/prisma'
export async function createSlot(
    userId : string,
    stage: number,
    zone: "init" | "A1" | "A2" | "A3" | "A4",
    productId: string
) {
    try {
        const shelve = await prisma.slot.create({
            data: {
                productId,
                userId,
                zone,
                stage,
            },
        });

        return { status: 200, message: "Shelve Created", shelve };
    } catch (error) {
        return { status: 500, error: "Failed to create shelve: " + error as string };
    }
}

export async function deleteSlot(slotId: string) {
    try {
        await prisma.slot.delete({
            where: { id: slotId },
        });

        return { status: 200, message: "Shelve Deleted" };
    } catch (error) {
        return { status: 500, error: "Failed to delete shelve: " + error as string };
    }
}

// export async function updateSlot(
//     slotId: string,
//     updates: Partial<{
//         name: string;
//         category: string;
//         zone: "init" | "A1" | "A2" | "A3" | "A4";
//     }>
// ) {
//     try {
//         const shelve = await prisma.slot.update({
//             where: { id: slotId },
//             data: updates,
//         });

//         return { status: 200, message: "Shelve Updated", shelve };
//     } catch (error) {
//         return { status: 500, error: "Failed to update shelve: " + error as string };
//     }
// }

// export async function getSlotById(slotId: string) {
//     try {
//         const shelve = await prisma.slot.findUnique({
//             where: { id: slotId },
//         });

//         if (shelve) {
//             return { status: 200, shelve };
//         } else {
//             return { status: 404, error: "Shelve not found" };
//         }
//     } catch (error) {
//         return { status: 500, error: "Failed to retrieve shelve: " + error as string };
//     }
// }

// export async function getSlotByCategory(category: string) {
//     try {
//         const slots = await prisma.slot.findMany({
//             where: { category },
//         });

//         return { status: 200, slots };
//     } catch (error) {
//         return { status: 500, error: "Failed to retrieve shelves: " + error as string };
//     }
// }
