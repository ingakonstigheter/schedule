"use client";
import { NewShift, Shift } from "@/lib/types/types";
import Form from "next/form";
import React, { useActionState } from "react";
import { createShift, updateShift } from "../actions/shift";

export default function ShiftForm(shift: { shift?: NewShift | Shift }) {
  const action = shift ? updateShift : createShift;
  const [state, formAction, isPending] = useActionState(action, null);
  return (
    <Form action={formAction} className="grid gap-4 w-full h-full">
      <label htmlFor="employee">Employee:</label>

      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" className="bg-red-400" />
      <label htmlFor="start">Start Time:</label>
      <input type="datetime" name="start" id="start" className="bg-red-400" />
      <label htmlFor="end">End Time:</label>
      <input type="datetime" name="end" id="end" className="bg-red-400" />
      <button type="submit" className="btn"></button>
    </Form>
  );
}
