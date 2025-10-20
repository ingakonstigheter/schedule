import { User } from "@/lib/types/types";
import Link from "next/link";

export default function EmployeeSelector({
  userId,
  employees,
}: {
  userId?: number;
  employees?: User[];
}) {
  return (
    <div className="grid gap-2 col-span-2">
      {employees && employees.length > 0 ? (
        <>
          <label htmlFor="employee" className="hidden ">
            Employee:
          </label>
          <select
            name="employee"
            id="employee"
            defaultValue={userId}
            className="border rounded">
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </>
      ) : (
        <span className="flex gap-2 ">
          No employees found.
          <Link
            href={"employees"}
            className="link rounded px-2  bg-red-200 rounded hover:bg-red-300">
            Manage Employees
          </Link>
        </span>
      )}
    </div>
  );
}
