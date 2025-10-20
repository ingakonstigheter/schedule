"use server";
import { setShift } from "@/lib/data/shifts";
import { NewShift } from "@/lib/types/types";
import { NewShiftSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function updateShift() {}

export async function createShift(
  prevState: unknown,
  formData: FormData
): Promise<{
  validationErrors: Record<string, String[]>;
  data: NewShift;
  dbError: string;
}> {
  console.log("inne");

  const newShift: NewShift = {
    userId: parseInt(formData.get("userId") as string) ?? null,
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
    return {
      validationErrors: errors.fieldErrors,
      data: newShift,
      dbError: "",
    };
  }
  const response = await setShift(result.data);
  console.log(response.success);

  if (!response.success) {
    return {
      validationErrors: {},
      data: newShift,
      dbError: response.error ?? "",
    };
  }
  revalidatePath("/");
  redirect("/schedules?success");
}
