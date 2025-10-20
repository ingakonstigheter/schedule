"use server";
import { deleteShift, setShift } from "@/lib/data/shifts";
import { NewShift } from "@/lib/types/types";
import { NewShiftSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { log } from "util";
import z from "zod";

export async function updateShift() {}

export async function createShift(
  prevState: unknown,
  formData: FormData
): Promise<{
  validationErrors: Record<string, String[]>;
  data: NewShift;
  dbError: string | null;
}> {
  const userIdInput =
    (formData.get("employee") as string) === ""
      ? null
      : parseInt(formData.get("employee") as string);

  const newShift: NewShift = {
    userId: userIdInput,
    date: new Date(formData.get("date") as string),
    startTime: new Date(
      `${formData.get("date") as string}T${formData.get("start") as string}`
    ),
    endTime: new Date(
      `${formData.get("date") as string}T${formData.get("end") as string}`
    ),
    clockedIn: null,
    clockedOut: null,
    type: formData.get("type") as string,
    comment: formData.get("comment") as string,
  };
  const result = NewShiftSchema.safeParse(newShift);
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
      validationErrors: {},
      data: newShift,
      dbError: response.error ?? "",
    };
  }
  revalidatePath("/");
  redirect("/schedules");
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
