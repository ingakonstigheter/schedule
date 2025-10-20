import { DBResponse, User } from "../types/types";
import { prisma } from "../prisma/prisma";

export async function getAllUsers(): Promise<DBResponse<User[]>> {
  try {
    const users = await prisma.user.findMany();
    return { success: true, data: users };
  } catch (error) {
    console.error("Error retrieving users:", error);
    return { success: false, error: new Error("Failed to retrieve users") };
  }
}
