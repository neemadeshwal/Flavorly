import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email is required" }),

  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase letter" })
    .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase letter" })
    .regex(/^(?=.*\d)/, { message: "Must include a number" })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Must include a special character (@$!%*?&)",
    }),
});

export const signupSchema = z.object({
  firstname: z
    .string({ message: "first name is required." })
    .min(5, "Firstname should be atleast five characters.")
    .max(20, "First name should be atmost 20 characters."),
  lastname: z.string().optional(),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase letter" })
    .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase letter" })
    .regex(/^(?=.*\d)/, { message: "Must include a number" })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Must include a special character (@$!%*?&)",
    }),
  phone: z
    .string()
    .regex(/^(\+91)?[1-9]\d{9}$/, {
      message: "Phone number must be 10 digits.",
    })
    .optional(),
});

export const EmailSchema = z.object({
  email: z.email({ message: "Email is required" }),
});
