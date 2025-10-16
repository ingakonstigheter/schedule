import React from "react";
import Form from "next/form";
import { getShiftById } from "@/lib/data/shifts";
import { redirect } from "next/navigation";
import ShiftForm from "../_components/shift-form";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "new") {
    const response = await getShiftById(Number(slug));
    if (!response.success) {
      redirect("/admin/schedules?error=Shift not found");
    }
    const shift = response.data;
    return (
      <div>
        <h1>Edit Shift</h1>
        <ShiftForm shift={shift}></ShiftForm>
      </div>
    );
  }
  return <ShiftForm></ShiftForm>;
}
