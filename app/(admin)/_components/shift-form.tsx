"use client";

import { Shift, User } from "@/lib/types/types";
import Form from "next/form";
import React, { useActionState } from "react";
import { createShift, updateShift } from "../actions/shift";
import Link from "next/link";
import EmployeeSelector from "./employee-selector";
type ShiftFormProps = {
  shift?: Shift;
  employees?: User[];
};

export default function ShiftForm({ shift, employees }: ShiftFormProps) {
  const action = /*  shift ? updateShift : */ createShift;
  const [state, formAction, isPending] = useActionState(action, null);
  const data = state?.data ??
    shift ?? {
      id: "",
      userId: 0,
      date: new Date(),
      startTime: "00:00",
      endTime: "00:00",
      type: "",
      comment: "",
    };

  return (
    <Form
      action={formAction}
      className="grid gap-4 text-xl grid-cols-2 max-w-lg border-2 rounded p-4 mx-auto"
      key={JSON.stringify(state?.data)}>
      {/*       {data.id ? (
        <input
          type="number"
          name="id"
          id="id"
          defaultValue={data.id}
          className="hidden"
        />
      ) : (
        ""
      )} */}
      <EmployeeSelector userId={data.userId ?? 0} />
      <label htmlFor="date" className="flex gap-2">
        Date:
        <input
          type="date"
          name="date"
          id="date"
          className="w-min hide-input-icon border-2 text-center rounded px-1"
          defaultValue={new Date(data.date).toISOString().split("T")[0]}
        />
      </label>

      <div className="grid grid-cols-2 gap-2 col-span-2">
        <label htmlFor="start" className="flex gap-2">
          Start:
          <input
            className="flex border-2 rounded px-1"
            type="time"
            name="start"
            id="start"
            defaultValue={data.startTime.toLocaleString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
            required
          />
        </label>
        <label htmlFor="end" className="flex gap-2">
          End:
          <input
            className="flex border-2 rounded px-1"
            type="time"
            name="end"
            id="end"
            defaultValue={data.endTime.toLocaleString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
            required
          />
        </label>
      </div>
      <label htmlFor="type" className="flex gap-2">
        Type:
        <input
          type="text"
          name="type"
          id="type"
          defaultValue={data.type ?? ""}
          className="border-2 rounded px-2"
        />
      </label>
      <div className="col-span-2 flex flex-col">
        <label htmlFor="comment">Comment:</label>
        <textarea
          className="border-2 rounded p-2"
          name="comment"
          id="comment"
          rows={4}
          defaultValue={data.comment ?? ""}></textarea>
      </div>
      <div className="flex gap-2 col-start-2">
        <button type="submit" className="btn ">
          Submit
        </button>
        <Link href="/schedules" className="btn btn-cancel">
          Cancel
        </Link>
      </div>
    </Form>
  );
}
