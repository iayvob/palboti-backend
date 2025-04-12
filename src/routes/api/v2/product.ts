import { Router } from "express";
import {
    createProductController,
    deleteProductController,
    updateProductController,
} from "@/controllers/product-controller";
import {
    createProductSchema,
    deleteProductSchema,
    updateProductSchema,
} from "@/validations/productSchema";
import validate from "express-zod-safe";

const router = Router();

// Create a new product
router.post(
    "/",
    validate(createProductSchema),
    createProductController
);

// // Get product by ID
// router.get(
//     "/:id",
//     validate(getProductSchema),
//     getProductController
// );

// // Get products by user
// router.get(
//     "/user/:email",
//     validate(getProductsByUserSchema),
//     getUserProductsController
// );

// Update product
router.put(
    "/:id",
    validate(updateProductSchema),
    updateProductController
);

// Delete product
router.delete(
    "/:id",
    validate(deleteProductSchema),
    deleteProductController
);

export default router;