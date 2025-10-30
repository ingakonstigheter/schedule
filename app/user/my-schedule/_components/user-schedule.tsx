import { Shift } from "@/lib/types/types";
import { formatDate, formatTime } from "@/lib/utils/date-format";
import React from "react";

export default function UserSchedule({ shifts }: { shifts: Shift[] }) {
  return (
    <table className="table-fixed border-collapse text-left w-full border">
      <thead>
        <tr>
          <th className=" p-2 ">Date</th>
          <th className=" p-2">Time</th>
          <th className=" p-2">Type</th>
          <th className=" p-2">Comment</th>
        </tr>
      </thead>
      <tbody>
        {shifts ? (
          shifts.map((shift) => (
            <tr key={shift.id} className="border border-slate-300">
              <td className=" p-2 w-1/5">{formatDate(shift.date)}</td>
              <td className=" p-2 w-1/5">
                <div className="grid gap-1">
                  <p className="font-bold bg-blue-300 rounded w-fit px-2">
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </p>
                  <p className="font-bold bg-red-300 rounded w-fit px-2">
                    <span className="font-bold">
                      {`${shift.clockedIn ? formatTime(shift.clockedIn) : ""} - ${shift.clockedOut ? formatTime(shift.clockedOut) : ""}`}
                    </span>
                  </p>
                </div>
              </td>
              <td className="p-2 w-1/5">{shift.type}</td>
              <td className="p-2 w-1/5">{shift.comment}</td>
            </tr>
          ))
        ) : (
          <p>No shifts found</p>
        )}
      </tbody>
    </table>
  );
}
