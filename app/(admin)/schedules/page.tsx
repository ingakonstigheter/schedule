import { getAllShifts } from "@/lib/data/shifts";
import { formatTime, formatDate } from "@/lib/utils/date-format";
import Link from "next/link";
export default async function Page() {
  const response = await getAllShifts();
  if (response.success) {
    const shifts = response.data;

    return (
      <>
        <Link className="link" href={"/new"}>
          New Shift
        </Link>
        <div>
          <table className="table-fixed border-collapse text-left w-full border">
            <thead>
              <tr>
                <th className=" p-2">Employee</th>
                <th className=" p-2 ">Date</th>
                <th className=" p-2">Time</th>
                <th className=" p-2">Total</th>
                <th className=" p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shifts ? (
                shifts.map((shift) => (
                  <tr key={shift.id} className="border border-slate-300">
                    <td className=" p-2 w-1/4">
                      {shift.userId ? shift.userId : "Empty"}
                    </td>
                    <td className=" p-2 w-1/4">{formatDate(shift.date)}</td>
                    <td className=" p-2 w-1/4">
                      <div className="grid gap-1">
                        <p className="font-bold bg-blue-300 rounded w-fit px-2">
                          {formatTime(shift.startTime)} -{" "}
                          {formatTime(shift.endTime)}
                        </p>
                        <p className="font-bold bg-red-300 rounded w-fit px-2">
                          {shift.clockedIn
                            ? formatTime(shift.clockedIn)
                            : "Not clocked in"}
                        </p>
                      </div>
                    </td>
                    <td>3</td>
                    <td className="p-2 w-1/4 flex gap-2">
                      <Link
                        href={`/${shift.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit
                      </Link>
                      <Link
                        href={`/${shift.id}`}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No shifts found</p>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
