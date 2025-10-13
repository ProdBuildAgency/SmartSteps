import { z } from "zod";
import { Role } from "../../Enums";

export const ResetPasswordSchema = z.object({
    role: z.nativeEnum(Role).refine(role => role === Role.ADMIN, {
        message: "Role must be Admin",
    }),
    userId: z.string().uuid(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
