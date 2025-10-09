import { z } from "zod";

export const ShiftSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.date(),
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

