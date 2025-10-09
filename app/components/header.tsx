import Link from "next/link";
import React from "react";

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
            <Link href={"/login"} className="nav-link">
              Log in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
