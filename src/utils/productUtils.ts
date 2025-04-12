import prisma from "@/config/db/prisma";

export async function createProduct(
    userId: string,
    category: string,
    status: string,
    stage: number,
    location?: string,
    tags: string[] = []
) {
    const user = await prisma.user.findFirst({
        where: { id: userId }
    });

    if (!user) {
        return { status: 404, error: "Cannot find user" };
    }

    const product = await prisma.product.create({
        data: {
            userId: user.id,
            category,
            status,
            stage,
            location,
            tags,
        }
    });

    if (product) {
        return { status: 200, message: "Product Created", product };
    } else {
        return { status: 500, error: "Failed to create product" };
    }
}

export async function deleteProduct(productId: string) {
    try {
        const result = await prisma.product.delete({
            where: { id: productId },
        });

        if (result) {
            return { status: 200, message: "Product Deleted" };
        }
    } catch (error) {
        return { status: 500, error: "Failed to delete product" + error as string };
    }
}

export async function updateProduct(
    productId: string,
    updates: Partial<{
        category: string;
        status: string;
        location: string;
        tags: string[];
    }>
) {
    try {
        const product = await prisma.product.update({
            where: { id: productId },
            data: updates,
        });

        return { status: 200, message: "Product Updated", product };
    } catch (error) {
        return { status: 500, error: "Failed to update product" + error as string };
    }
}

// export async function getProductById(productId: string) {
//     const product = await prisma.product.findUnique({
//         where: { id: productId },
//     });

//     if (product) {
//         return { status: 200, product };
//     } else {
//         return { status: 404, error: "Product not found" };
//     }
// }

// export async function getProductsByUser(email: string) {
//     const normalizedIdentifier = email.toLowerCase();
//     const user = await prisma.user.findFirst({
//         where: { email: normalizedIdentifier }
//     });

//     if (!user) {
//         return { status: 404, error: "Cannot find user" };
//     }

//     const products = await prisma.product.findMany({
//         where: { userId: user.id },
//     });

//     return { status: 200, products };
// }