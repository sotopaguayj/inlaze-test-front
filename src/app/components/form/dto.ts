import { z } from "zod";

export const SingUpDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre no puede estar vacío" })
    .refine((val) => typeof val === "string", {
      message: "El nombre debe ser una cadena de texto",
    }),

  userName: z
    .string()
    .min(1, { message: "El nombre de usuario no puede estar vacío" })
    .refine((val) => typeof val === "string", {
      message: "El nombre de usuario debe ser una cadena de texto",
    }),

  email: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .email("El correo electrónico debe ser válido"),

  password: z
    .string({ required_error: "La contraseña no puede estar vacía" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const UpdateUserDtoSchema = SingUpDtoSchema.partial();

export type SingUpDto = z.infer<typeof SingUpDtoSchema>;

export const SingInDtoSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type SingInDto = z.infer<typeof SingInDtoSchema>;
