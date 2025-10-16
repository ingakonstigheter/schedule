import { DBResponse, NewShift, Shift, User } from "../types/types";
import { prisma } from "../prisma/prisma";
/* 
export async function createShift(shift: NewShift) {
  try {
    const newShift: Shift = await prisma.shift.createAndReturn({
      data: shift,
    });
    return newShift;
  } catch (error) {
    console.error("Error creating shift:", error);
    return new Error("Failed to create shift");
  }
}
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
export async function deleteShift(id: Pick<Shift, "id">) {
  try {
    const existingShift = await prisma.shift.findUnique({
      where: { id: id },
    });

    if (existingShift) {
      return await prisma.shift.delete({
        where: { id: id },
      });
    }
    return new Error("Shift not found");
  } catch (error) {
    console.error("Error deleting shift:", error);
    return new Error("Failed to delete shift");
  }
} */
export async function getAllShifts(): Promise<DBResponse<Shift[]>> {
  try {
    const shifts = await prisma.shift.findMany();
    return { success: true, data: shifts };
  } catch (error) {
    console.error("Error retrieving shifts:", error);
    return { success: false, error: new Error("Failed to retrieve shifts") };
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
      return { success: false, error: new Error("Shift not found") };
    }
  } catch (error) {
    console.error("Error retrieving shift:", error);
    return { success: false, error: error as Error };
  }
} /* 
export async function getShiftsByEmployee(employeeId: Pick<User, "id">) {
  try {
    return await prisma.shift.findMany({
      where: {
        employees: {
          some: {
            id: employeeId,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error retrieving shifts:", error);
    return new Error("Failed to retrieve shifts");
  }
}
 */
