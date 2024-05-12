import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
  email: string;
  name: string;
  password: string;
};

export type FormDataLogin = {
  email: string;
  password: string;
};

export type FormFieldProps = {
  type: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type FormFieldLoginProps = {
  type: string;
  name: ValidFieldNamesLogin;
  register: UseFormRegister<FormDataLogin>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "email" | "name" | "password";

export type ValidFieldNamesLogin = "email" | "password";

export const UserSchema: ZodType<FormData> = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }),
  name: z.string().min(2, { message: "Ingrese su nombre" }),
  password: z
    .string()
    .min(2, { message: "La contraseña es muy corta" })
    .max(8, { message: "La contraseña es muy larga" }),
  // confirmPassword: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Las contraseñas no coinciden",
//   path: ["confirmPassword"],
// });

export const UserSchemaLogin: ZodType<FormDataLogin> = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }),
  password: z
    .string()
    .min(2, { message: "La contraseña es muy corta" })
    .max(8, { message: "La contraseña es muy larga" }),
});
