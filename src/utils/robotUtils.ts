import prisma from "@/config/db/prisma";

export async function createRobot(
  name: string,
  location: "init" | "A1" | "A2" | "A3" | "A4"
) {
  try {
    const robot = await prisma.robot.create({
      data: {
        name,
        location,
      },
    });

    return { status: 200, message: "Robot Created", robot };
  } catch (error) {
    return { status: 500, error: "Failed to create robot: " + (error as string) };
  }
}

export async function deleteRobot(robotId: string) {
  try {
    await prisma.robot.delete({
      where: { id: robotId },
    });

    return { status: 200, message: "Robot Deleted" };
  } catch (error) {
    return { status: 500, error: "Failed to delete robot: " + (error as string) };
  }
}

export async function updateRobot(
  robotId: string,
  updates: Partial<{
    name: string;
    location: "init" | "A1" | "A2" | "A3" | "A4";
    charge: string;
  }>
) {
  try {
    const robot = await prisma.robot.update({
      where: { id: robotId },
      data: updates,
    });

    return { status: 200, message: "Robot Updated", robot };
  } catch (error) {
    return { status: 500, error: "Failed to update robot: " + (error as string) };
  }
}

export async function getRobotById(robotId: string) {
  try {
    const robot = await prisma.robot.findUnique({
      where: { id: robotId },
    });

    if (!robot) {
      return { status: 404, error: "Robot not found" };
    }

    return { status: 200, robot };
  } catch (error) {
    return { status: 500, error: "Failed to fetch robot: " + (error as string) };
  }
}

export async function getAllRobots() {
  try {
    const robots = await prisma.robot.findMany();
    return { status: 200, robots };
  } catch (error) {
    return { status: 500, error: "Failed to fetch robots: " + (error as string) };
  }
}
