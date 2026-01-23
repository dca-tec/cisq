import { z } from "zod";

// Login form validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Formato de email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatória" })
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
    .max(128, { message: "Senha deve ter no máximo 128 caracteres" }),
});

// Registration form validation schema
export const registrationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: "Nome contém caracteres inválidos" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Sobrenome é obrigatório" })
    .max(50, { message: "Sobrenome deve ter no máximo 50 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: "Sobrenome contém caracteres inválidos" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Formato de email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
    .max(128, { message: "Senha deve ter no máximo 128 caracteres" })
    .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "Senha deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirmação de senha é obrigatória" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Search input validation schema
export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .max(200, { message: "Busca deve ter no máximo 200 caracteres" })
    .transform((val) => val.replace(/[<>]/g, "")), // Basic XSS sanitization
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
