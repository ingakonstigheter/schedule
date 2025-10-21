import React from "react";
import { getShiftById } from "@/lib/data/shifts";
import { redirect } from "next/navigation";
import ShiftForm from "../_components/shift-form";
import { getAllUsers } from "@/lib/data/employees";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let shift = null;
  const { slug } = await params;
  if (slug !== "new") {
    const response = await getShiftById(Number(slug));
    if (!response.success) {
      redirect("/admin/schedules?error=Shift not found");
    }
    shift = response.data;
  }
  const employees = await getAllUsers();

  return (
    <div className="grid gap-4">
      <h1>Edit Shift</h1>
      <ShiftForm
        shift={shift}
        employees={employees.success ? employees.data : null}></ShiftForm>
    </div>
  );
}
