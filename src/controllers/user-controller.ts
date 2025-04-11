import { Request, Response } from "express";
import { hash } from "bcryptjs";
import prisma from "@/config/db/prisma";
import { asyncWrapper } from "@/middleware/asyncWrapper";
import { profile } from "@/validations/userSchema";

/**
 * Get a single user by ID.
 */

export const getUser = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.params;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        res.status(200).json({ errorMsg: "User not found", status: 404 });
        return;
      };

      const userProfile: profile = {
        userId: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      };

      res.status(200).json({
        status: 200,
        success: `User ${user.email} fetched successfully!`,
        user: userProfile,
      });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({
        errorMsg: "User creation failed",
        details: error instanceof Error ? error.message : error,
      });
    }
  },
);


/**
 * Update an existing user information
 */

export const updateUserInfo = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        id,
        name,
        lastLogin,
      } = req.body;

      // Validate that the user ID is provided
      if (!id) {
        res.status(400).json({ errorMsg: "User ID is required" });
        return;
      }

      // Check if there's data to update
      if (
        !name &&
        !lastLogin
      ) {
        res.status(400).json({ errorMsg: "No data to update" });
        return;
      }

      // Verify the user exists
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        res.status(404).json({ errorMsg: "User not found" });
        return;
      }


      // Update the merged user record
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name: name ?? user.name,
          lastLogin: lastLogin ?? user.lastLogin ?? null,
        },
      });

      res.status(200).json({
        success: `User ${updatedUser.email} updated successfully`,
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({
        errorMsg: "User creation failed",
        details: error instanceof Error ? error.message : error,
      });
    }
  },
);

/**
 * Update an existing user Password
 */

export const UpdateUserPassword = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, password, newPassword } = req.body;

      // Validate input
      if (!id) {
        res.status(400).json({ errorMsg: "User ID is required" });
        return;
      }
      if (!password || !newPassword) {
        res.status(400).json({ errorMsg: "Passwords is required" });
        return;
      }

      // Verify the user exists
      const user = await prisma.user.findUnique({
        where: { id },
        select: { password: true },
      });

      if (!user) {
        res.status(404).json({ errorMsg: "User not found" });
        return;
      }

      if (user?.password !== password) {
        res.status(400).json({ errorMsg: "Password is incorrect" });
        return;
      }

      // Hash the new password
      const hashedPassword = await hash(newPassword, 10);

      // Update the password field in the merged user model
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });

      res.status(200).json({
        success: `User ${updatedUser.email} password updated successfully`,
      });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({
        errorMsg: "User creation failed",
        details: error instanceof Error ? error.message : error,
      });
    }
  },
);


/**
 * Delete User Info
 */

export const DeleteUserInfo = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.params;

      const user = await prisma.user.delete({
        where: { email }
      });

      // Verify the user exists
      if (!user) {
        res.status(200)
        return;
      }

      res.status(200);
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({
        errorMsg: "User creation failed",
        details: error instanceof Error ? error.message : error,
      });
    }
  },
);