import { DBResponse, Shift, ShiftAction } from "../types/types";
import { prisma } from "../prisma/prisma";
export async function setShift(
  shift: ShiftAction
): Promise<DBResponse<ShiftAction>> {
  try {
    const newShift: Shift = await prisma.shift.create({
      data: shift,
    });
    return { success: true, data: newShift };
  } catch (error) {
    console.error("Error creting shift:", error);
    return { success: false, error: "Error creting shift:" };
  }
}
export async function deleteShift(id: number): Promise<DBResponse<number>> {
  try {
    await prisma.shift.delete({
      where: { id: id },
    });
    return { success: true, data: id };
  } catch (error) {
    console.error("Error deleting shift:", error);
    return { success: false, error: `Error deleting shift: ${id}` };
  }
}
export async function updateShift(
  shift: ShiftAction
): Promise<DBResponse<ShiftAction>> {
  try {
    await prisma.shift.update({
      where: { id: shift.id },
      data: {
        userId: shift.userId ?? shift.userId,
        date: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime,
        type: shift.type,
        comment: shift.comment,
        updatedAt: new Date(Date.now()),
      },
    });
    return { success: true, data: shift };
  } catch (error) {
    console.error("Error updating shift employee:", error);
    return { success: false, error: "Failed to update shift employee" };
  }
}
export async function getAllShifts(): Promise<DBResponse<Shift[]>> {
  try {
    const shifts = await prisma.shift.findMany();
    return { success: true, data: shifts };
  } catch (error) {
    console.error("Error retrieving shifts:", error);
    return { success: false, error: "Failed to retrieve shifts" };
  }
}
export async function getSelectedShiftsByPeriod(
  startDate: Date,
  endDate: Date
) {
  try {
    return await prisma.shift.findMany({
      where: {
        startTime: {
          gte: startDate,
        },
        endTime: {
          lte: endDate,
        },
      },
    });
  } catch (error) {
    console.error("Error retrieving shifts:", error);
    return new Error("Failed to retrieve shifts");
  }
}
export async function getShiftById(id: number): Promise<DBResponse<Shift>> {
  try {
    const shift = await prisma.shift.findUnique({
      where: { id: id },
    });
    if (shift) {
      return { success: true, data: shift };
    } else {
      return { success: false, error: "Shift not found" };
    }
  } catch (error) {
    console.error("Error retrieving shift:", error);
    return { success: false, error: "Error retrieving shift:" };
  }
}
