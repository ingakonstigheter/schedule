import { DBResponse, NewShift, Shift } from "../types/types";
import { prisma } from "../prisma/prisma";
export async function setShift(shift: NewShift) {
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
/* 
        export async function updateShiftEmployee(
  shiftId: Pick<Shift, "id">,
  employe: Pick<User, "id">
) {
  try {
    const existingShift = await prisma.shift.findUnique({
      where: { id: shiftId },
    });

    if (existingShift) {
      return await prisma.shift.update({
        where: { id: shiftId },
        data: { employees: { connect: { id: employe.id } } },
      });
    }
    return new Error("Shift not found");
  } catch (error) {
    console.error("Error updating shift employee:", error);
    return new Error("Failed to update shift employee");
  }
}
export async function updateShiftTime(
  id: Pick<Shift, "id">,
  newStart: Date,
  newEnd: Date
) {
  try {
    const existingShift = await prisma.shift.findUnique({
      where: { id: id },
    });

    if (existingShift) {
      return await prisma.shift.update({
        where: { id: id },
        data: { startTime: newStart, endTime: newEnd },
      });
    }
    return new Error("Shift not found");
  } catch (error) {
    console.error("Error updating shift time:", error);
    return new Error("Failed to update shift time");
  }
}
export async function updateShiftDate(id: Pick<Shift, "id">, newDate: Date) {
  try {
    const existingShift = await prisma.shift.findUnique({
      where: { id: id },
    });

    if (existingShift) {
      return await prisma.shift.update({
        where: { id: id },
        data: { date: newDate },
      });
    }
    return new Error("Shift not found");
  } catch (error) {
    console.error("Error updating shift date:", error);
    return new Error("Failed to update shift date");
  }
}
*/
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
