"use client";
import React, { useActionState } from "react";
import { deleteShiftAction } from "../_actions/shift";
import Form from "next/form";

export default function DeleteButton({ id }: { id: number }) {
  const action = deleteShiftAction;
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <>
      <Form action={formAction}>
        <input type="number" name="id" id="id" hidden defaultValue={id} />
        <button
          type="submit"
          disabled={isPending ? true : false}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete
        </button>
        {state?.dbError && <p>{state.dbError}</p>}
      </Form>
    </>
  );
}
