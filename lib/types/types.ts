import { z } from "zod";
import { ShiftSchema, UserSchema } from "../zod";

export type User = z.infer<typeof UserSchema>;
export type Shift = z.infer<typeof ShiftSchema>;
export type NewShift = Omit<Shift, "id" | "createdAt" | "updatedAt">;
export type NewUser = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "shifts" | "clockedIn" | "clockedOut"
>;

export type DBResponse<T> =
  | { success: true; data: T }
  | { success: false; error: String | Error };
