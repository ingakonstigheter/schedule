"use server";
import { deleteShift, setShift, updateShift } from "@/lib/data/shifts";
import { ShiftAction } from "@/lib/types/types";
import { ShiftActionSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function createShiftAction(
  prevState: unknown,
  formData: FormData
): Promise<{
  validationErrors: Record<string, String[]> | null;
  data: ShiftAction;
  dbError: string | null;
}> {
  const userIdInput =
    (formData.get("employee") as string) === ""
      ? null
      : parseInt(formData.get("employee") as string);

  const newShift: ShiftAction = {
    id: 0,
    userId: userIdInput,
    date: new Date(formData.get("date") as string),
    startTime: new Date(
      `${formData.get("date") as string}T${formData.get("start") as string}`
    ),
    endTime: new Date(
      `${formData.get("date") as string}T${formData.get("end") as string}`
    ),
    type: formData.get("type") as string,
    comment: formData.get("comment") as string,
  };
  const result = ShiftActionSchema.safeParse(newShift);
  if (!result.success) {
    const errors = z.flattenError(result.error);
    console.error(errors);

    return {
      validationErrors: errors.fieldErrors,
      data: newShift,
      dbError: "",
    };
  }
  const response = await setShift(result.data);

  if (!response.success) {
    return {
      validationErrors: null,
      data: newShift,
      dbError: response.error ?? "",
    };
  }
  revalidatePath("/");
  redirect("/admin/schedules");
}
export async function deleteShiftAction(
  prevState: unknown,
  formData: FormData
): Promise<{
  data: number;
  dbError: string | null;
}> {
  const id = parseInt(formData.get("id") as string);
  const response = await deleteShift(id);
  if (response.success) {
    revalidatePath("/");
    return { data: id, dbError: "" };
  } else {
    return { data: id, dbError: response.error };
  }
}
export async function updateShiftAction(
  prevState: unknown,
  formData: FormData
): Promise<{
  validationErrors: Record<string, String[]> | null;
  data: ShiftAction;
  dbError: string | null;
}> {
  const userIdInput =
    (formData.get("employee") as string) === ""
      ? null
      : parseInt(formData.get("employee") as string);

  const toUpdateShift: ShiftAction = {
    userId: userIdInput,
    date: new Date(formData.get("date") as string),
    startTime: new Date(
      `${formData.get("date") as string}T${formData.get("start") as string}`
    ),
    endTime: new Date(
      `${formData.get("date") as string}T${formData.get("end") as string}`
    ),
    type: formData.get("type") as string,
    comment: formData.get("comment") as string,
    id: parseInt(formData.get("id") as string),
  };

  const result = ShiftActionSchema.safeParse(toUpdateShift);
  if (!result.success) {
    const errors = z.flattenError(result.error);
    console.error(errors);

    return {
      validationErrors: errors.fieldErrors,
      data: toUpdateShift,
      dbError: "",
    };
  }
  const response = await updateShift(toUpdateShift);

  if (!response.success) {
    return {
      validationErrors: {},
      data: toUpdateShift,
      dbError: response.error ?? "",
    };
  }
  revalidatePath("/");
  redirect("/schedules");
}
