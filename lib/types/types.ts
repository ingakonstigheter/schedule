import { z } from "zod";
import { ShiftSchema, UserSchema } from "../zod";

export type User = z.infer<typeof UserSchema>;
export type Shift = z.infer<typeof ShiftSchema>;