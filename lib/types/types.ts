import { z } from "zod";
import { NewShiftSchema, ShiftSchema, UserSchema } from "../zod";

export type User = z.infer<typeof UserSchema>;
export type Employee = z.infer<typeof UserSchema>;

export type Shift = z.infer<typeof ShiftSchema>;
export type NewShift = z.infer<typeof NewShiftSchema>;
export type NewUser = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "shifts" | "clockedIn" | "clockedOut"
>;

export type DBResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
