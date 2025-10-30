import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { getUserRole } from "./lib/data/user";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher("/(admin)(.*)");
const isUserRoute = createRouteMatcher("/(user)(.*)");

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId } = await auth();
  if (!userId) {
  }

  const role = sessionClaims?.metadata?.role;

  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isUserRoute(req) && role !== "user" && role !== "admin") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
