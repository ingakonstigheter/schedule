import React from "react";
import TodaysSchedule from "./_components/todays-schedule";
import UserSchedule from "./_components/user-schedule";
import { getAllShiftsByUserId } from "@/lib/data/shifts";
import { auth } from "@clerk/nextjs/server";
import { getUserId } from "@/lib/data/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const idResponse = await getUserId(userId);
  if (!idResponse.success) {
    return redirect("/");
  }
  const response = await getAllShiftsByUserId(idResponse.data!);
  if (response.success) {
    const shifts = response.data;
    const today = new Date().toISOString().split("T")[0];
    const todaysShift = response.data.find(
      (shift) => new Date(shift.date).toISOString().split("T")[0] === today
    );
    console.log("today: " + today);
    console.log("todays shift: " + todaysShift);

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
