import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid gap-8 min-h-screen p-24">
      <h2 className="text-4xl font-extrabold mx-auto ">
        Welcome to Scheduler — Where Your Time Works for You
      </h2>
      <p className="max-w-[60ch] text-2xl text-center mx-auto">
        Welcome to Scheduler, the smarter way to manage your teams shifts.
        Create, edit, and organize employee schedules in minutes — no
        spreadsheets, no confusion. Whether youre running a small business or
        coordinating a growing team, Scheduler helps you stay organized, reduce
        scheduling conflicts, and keep everyone on the same page.
      </p>

      <div className="flex gap-4 justify-center mt-8">
        <SignedOut>
          <SignInButton>
            <button className="btn">Sign in</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn">Register</button>
          </SignUpButton>
        </SignedOut>
        <Link className="btn" href="/about">
          Read More
        </Link>
      </div>
    </main>
  );
}
