import { z } from "zod";

export const ShiftSchema = z.object({
  id: z.number().int(),
  userId: z.number().int().nullable(),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  createdAt: z.date(),
  clockedIn: z.date().nullable(),
  clockedOut: z.date().nullable(),
  updatedAt: z.date(),
});

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.string(),
  // shifts är en lista av Shift-objekt (valfri, beroende på behov)
  shifts: z.array(ShiftSchema).optional(),
});
