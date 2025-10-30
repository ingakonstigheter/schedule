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

export async function getUserRole(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUserId },
    select: { role: true },
  });
  if (!user) {
    return { success: true, error: "Failed to find the user" };
  }
  return { success: true, data: user.role };
}

export async function getUserId(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUserId },
    select: { id: true },
  });
  if (!user) {
    return { success: true, error: "Failed to find the user" };
  }
  return { success: true, data: user.id };
}