import React from "react";
import TodaysSchedule from "./_components/todays-schedule";
import UserSchedule from "./_components/user-schedule";
import { getAllShiftsByUserId } from "@/lib/data/shifts";

export default async function Page() {
  const response = await getAllShiftsByUserId(5);
  if (response.success) {
    const shifts = response.data;
    const today = new Date().toISOString().split("T")[0];
    const todaysShift = response.data.find(
      (shift) => new Date(shift.date).toISOString().split("T")[0] === today
    );
    return (
      <>
        {todaysShift ? (
          <TodaysSchedule shift={todaysShift} />
        ) : (
          <p>No shift for today found</p>
        )}
        <UserSchedule shifts={shifts} />
      </>
    );
  }
}
