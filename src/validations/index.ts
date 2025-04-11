import { stringNonEmpty } from "@/utils/zodUtils";
import { z } from "zod";

//? -------- REGEX ---------
export const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/;
export const hexRegex = /[\da-f]{40}$/i;

//? -------- Sub Schema ---------
export const emailSchema = stringNonEmpty().email().trim().toLowerCase();
export const usernameSchema = stringNonEmpty().trim();
export const infoSchema = z.string().trim().min(3).max(25).optional();
export const tokenSchema = stringNonEmpty()
  .length(40, { message: "must be a 40-character string" })
  .regex(hexRegex, { message: "must be a hexadecimal string" });