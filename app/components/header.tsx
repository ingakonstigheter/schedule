import Link from "next/link";
import React from "react";
import { checkRole } from "@/lib/roles";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
async function Header() {
  const isAdmin = await checkRole("admin");
  return (
    <header className="flex items-center justify-between p-4 bg-bg-secondary text-text-secondary font-bold">
      <h1 className="text-2xl">
        <Link href={"/"}>Scheduler</Link>
      </h1>
      <SignedIn>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href={""}>My Schedule</Link>
            </li>

            {isAdmin && (
              <>
                <li>
                  <Link href={"/schedules"}>Schedules</Link>
                </li>
                <li>
                  <Link href={"/employees"}>Employees</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <SignUpButton>
            <button className="nav-link">Log in</button>
          </SignUpButton>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default Header;
