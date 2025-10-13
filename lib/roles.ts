import { auth } from "@clerk/nextjs/server";
import { Roles } from "./types/globals";

export async function checkRole(role: Roles) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) return false;
  return sessionClaims.metadata.role === role;
}
