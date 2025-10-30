"use client";
import { Shift } from "@/lib/types/types";
import Form from "next/form";
import React, { useActionState } from "react";
import { clockInAction, clockOutAction } from "../../_actions/punch-clock";

export default function PunchClockBtn({ shift }: { shift: Shift }) {
  const action = shift.clockedIn === null ? clockInAction : clockOutAction;
  const [state, formAction, isPending] = useActionState(action, null);

  let btnPrompt = shift.clockedIn === null ? "Clock In" : "Clock Out";
  const hide = shift.clockedOut !== null ? "hidden" : "";

  return (
    <Form action={formAction} className="mx-auto">
      <input defaultValue={shift.id} name="id" hidden />
      <button className={`${hide} btn`} disabled={isPending}>
        {btnPrompt}
      </button>
    </Form>
  );
}
