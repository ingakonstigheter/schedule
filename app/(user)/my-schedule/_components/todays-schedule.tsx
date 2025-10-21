import { Shift } from "@/lib/types/types";
import { formatDate, formatTime } from "@/lib/utils/date-format";
import React from "react";
import PunchClockBtn from "./punch-clock-btn";

export default function TodaysSchedule({ shift }: { shift: Shift }) {
  return (
    <div className="grid gap-2 border-2 mx-auto w-sm p-8">
      <h2 className="font-bold text-2xl">Todays Shift</h2>
      <p className="font-bold text-xl">{formatDate(shift.date)}</p>
      <p className="bold text-xl">{`Shift: ${formatTime(shift.startTime)} - ${formatTime(shift.startTime)}`}</p>
      <p className="font-bold text-xl">{`${shift.type}`}</p>
      <p className="border text-xl">{`${shift.comment}`}</p>
      <p className="flex gap-2 bold text-xl">
        Clocked
        <span className="font-bold">
          {`${shift.clockedIn ? formatTime(shift.clockedIn) : "hh-mm"} - ${shift.clockedOut ? formatTime(shift.clockedOut) : "hh-mm"}`}
        </span>
      </p>
      <PunchClockBtn shift={shift}></PunchClockBtn>
    </div>
  );
}
