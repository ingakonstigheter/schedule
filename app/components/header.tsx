import Link from "next/link";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-bg-secondary text-text-secondary font-bold">
      <h1 className="text-2xl">
        <Link href={"/"}>Scheduler</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href={"/about"} className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link href={"/contact"} className="nav-link">
              Contact
            </Link>
          </li>
          <li>
            <SignedOut>
              <SignInButton>
                <SignUpButton>
                  <button className="nav-link">Sign up</button>
                </SignUpButton>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
