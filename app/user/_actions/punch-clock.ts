"use server";

import { clockIn, clockOut } from "@/lib/data/shifts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function clockInAction(
  prevState: unknown,
  formData: FormData
): Promise<{
  data: number;
  dbError: string | null;
}> {
  const id = parseInt(formData.get("id") as string);

  const response = await clockIn(id);
  if (!response.success) {
    return { data: id, dbError: response.error };
  }
  revalidatePath("/");
  redirect("/user/my-schedule");
}

export async function clockOutAction(
  prevState: unknown,
  formData: FormData
): Promise<{
  data: number;
  dbError: string | null;
}> {
  const id = parseInt(formData.get("id") as string);

  const response = await clockOut(id);
  if (!response.success) {
    return { data: id, dbError: response.error };
  }
  revalidatePath("/");
  redirect("/user/my-schedule");
}
export { clockIn, clockOut };
