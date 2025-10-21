import { getAllShifts } from "@/lib/data/shifts";
import { formatTime, formatDate } from "@/lib/utils/date-format";
import Link from "next/link";
import DeleteButton from "../_components/delete-btn";
import { getAllUsers } from "@/lib/data/employees";
import { User } from "@/lib/types/types";

function getEmployeeNameById(id: number, employees: User[]) {
  const employee = employees.find((user) => user.id === id);
  return employee
    ? `${employee.firstName} ${employee.lastName}`
    : "Could not find the user";
}

export default async function Page() {
  const shiftResponse = await getAllShifts();

  if (shiftResponse.success) {
    const shifts = shiftResponse.data;
    const usersResponse = await getAllUsers();

    const users = usersResponse.success ? usersResponse.data : [];

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
                <th className=" p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shifts ? (
                shifts.map((shift) => (
                  <tr key={shift.id} className="border border-slate-300">
                    <td className=" p-2 w-1/4">
                      {shift.userId
                        ? getEmployeeNameById(shift.userId, users)
                        : "Unassigned"}
                    </td>
                    <td className=" p-2 w-1/4">{formatDate(shift.date)}</td>
                    <td className=" p-2 w-1/4">
                      <div className="grid gap-1">
                        <p className="font-bold bg-blue-300 rounded w-fit px-2">
                          {formatTime(shift.startTime)} -{" "}
                          {formatTime(shift.endTime)}
                        </p>
                        <p className="font-bold bg-red-300 rounded w-fit px-2">
                          <span className="font-bold">
                            {`${shift.clockedIn ? formatTime(shift.clockedIn) : "hh-mm"} - ${shift.clockedOut ? formatTime(shift.clockedOut) : "hh-mm"}`}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td className="p-2 w-1/4 flex gap-2">
                      <Link
                        href={`/${shift.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit
                      </Link>
                      <DeleteButton id={shift.id}></DeleteButton>
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
