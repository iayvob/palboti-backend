import { isDev } from "@/config/const";
import { swaggerOptions } from "@/config/swagger-docs/swaggerConfig";
import { multerErrorHandler } from "@/middleware/multer/multerErrorHandler";
import {
  uploadPDF,
  uploadPDFOptions,
} from "@/middleware/multer/multerUploader";
import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRouter from "./auth";
import user from "./user";
import product from "./product";
import insights from "./insights";
import robot from "./robot";
import slot from "./slot";
import task from "./task";

const router = Router();

const specs = swaggerJsdoc(swaggerOptions);

if (isDev) {
  router.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
    }),
  );
}

//*  --------- Public routes ---------------
router.use("/auth", authRouter);

//* ---------- Protected routes ------------
router.use("/user", user);
router.use("/products", product);
router.use("/insights", insights);
router.use("/robots", robot);
router.use("/slot", slot);
router.use("/tasks", task);

router
  .route("/upload")
  .post(uploadPDF.single("files"), multerErrorHandler(uploadPDFOptions));

export default router;