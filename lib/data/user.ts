import { DBResponse, User } from "../types/types";
import { prisma } from "../prisma";

export async function getAllUsers(): Promise<DBResponse<User[]>> {
  try {
    const users = await prisma.user.findMany();
    return { success: true, data: users };
  } catch (error) {
    console.error("Error retrieving users:", error);
    return { success: false, error: "Failed to retrieve users" };
  }
}

export async function createUser(
  data: Omit<User, "shifts">
): Promise<DBResponse<User>> {
  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId: data.clerkUserId },
      update: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
      create: data,
    });
    return { success: true, data: user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to creating user" };
  }
}
export async function deleteUser(
  clerkUserId: string
): Promise<DBResponse<string>> {
  try {
    await prisma.user.deleteMany({ where: { clerkUserId } });
    return { success: true, data: clerkUserId };
  } catch (error) {
    return { success: false, error: "Failed to delete user" };
  }
}
