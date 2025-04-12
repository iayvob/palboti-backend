import { asyncWrapper } from "@/middleware/asyncWrapper";
import logger from "@/utils/chalkLogger";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/utils/productUtils";
import { Request, Response } from "express";

export const createProductController = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { userId, category, status, stage, location, tags } = req.body;

    try {
      const result = await createProduct(userId, category, status, stage, location, tags);

      if (result.status === 200) {
          res.status(200).json(result);
      } else {
          res.status(result.status).json({ error: result.error });
      }
    } catch (error) {
      logger.error(
        `Product Creation Error`,
        `Cannot create product because of ${error as string}`
      );
      res.status(500).json({ error });
      return;
    }
  }
);

export const deleteProductController = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const result = await deleteProduct(id);

      if (result?.status === 200) {
        logger.success(`Product: ${id}`, `Deleted Successfully`);
        res.status(200).json({ message: result.message });
      } else {
        logger.warning(
          `Product Deletion Failed`,
          `Cannot delete product because of ${result?.error}`
        );
        res.status(result?.status || 400).json({ error: result?.error });
      }
    } catch (error) {
      logger.error(
        `Product Deletion Error`,
        `Cannot delete product because of ${error as string}`
      );
      res.status(500).json({ error });
    }
  }
);

 export const updateProductController = asyncWrapper(
   async (req: Request, res: Response): Promise<void> => {
     const { id } = req.params;
     const updates = req.body;

     try {
       const result = await updateProduct(id, updates);

       if (result?.status === 200) {
         logger.success(`Product: ${id}`, `Updated Successfully`);
         res.status(200).json({ message: result.message, product: result.product });
       } else {
         logger.warning(
           `Product Update Failed`,
           `Cannot update product because of ${result?.error}`
         );
         res.status(result?.status || 400).json({ error: result?.error });
       }
     } catch (error) {
       logger.error(
         `Product Update Error`,
         `Cannot update product because of ${error as string}`
       );
       res.status(500).json({ error });
     }
   }
 );

// export const getProductController = asyncWrapper(
//   async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;

//     try {
//       const result = await getProductById(id);

//       if (result?.status === 200) {
//         res.status(200).json({ product: result.product });
//       } else {
//         logger.warning(
//           `Product Fetch Failed`,
//           `Cannot fetch product because of ${result?.error}`
//         );
//         res.status(result?.status || 404).json({ error: result?.error });
//       }
//     } catch (error) {
//       logger.error(
//         `Product Fetch Error`,
//         `Cannot fetch product because of ${error as string}`
//       );
//       res.status(500).json({ error });
//     }
//   }
// );

// export const getUserProductsController = asyncWrapper(
//   async (req: Request, res: Response): Promise<void> => {
//     const { email } = req.params;

//     try {
//       const result = await getProductsByUser(email);

//       if (result?.status === 200) {
//         res.status(200).json({ products: result.products });
//       } else {
//         logger.warning(
//           `Products Fetch Failed`,
//           `Cannot fetch products because of ${result?.error}`
//         );
//         res.status(result?.status || 404).json({ error: result?.error });
//       }
//     } catch (error) {
//       logger.error(
//         `Products Fetch Error`,
//         `Cannot fetch products because of ${error as string}`
//       );
//       res.status(500).json({ error });
//     }
//   }
// );