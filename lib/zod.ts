import { z } from "zod";

export const ShiftSchema = z.object({
  id: z.number().int(),
  userId: z.number().optional().nullable(),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  createdAt: z.date(),
  clockedIn: z.date().nullable(),
  clockedOut: z.date().nullable(),
  updatedAt: z.date(),
  type: z.string(),
  comment: z.string().max(500).nullable(),
});
export const NewShiftSchema = ShiftSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.string(),
  shifts: z.array(ShiftSchema).optional(),
});
