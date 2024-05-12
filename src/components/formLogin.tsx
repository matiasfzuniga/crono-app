"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {FormFieldLogin} from "@/components/formField";
import { FormDataLogin, UserSchemaLogin} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(UserSchemaLogin),
  });

  const onSubmit = handleSubmit(async (data: FormDataLogin) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    if (res?.error) {
      console.error(res.error);
    }
  });
  return (
    <form
      onSubmit={onSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <FormFieldLogin
        type="email"
        name="email"
        register={register}
        error={errors.email}
      />
      <FormFieldLogin
        type="password"
        name="password"
        register={register}
        error={errors.password}
      />
      {/* <Input type="email" id="email" {...register("email")}/>
            <Input type="password" id="password" autoComplete="on" {...register("password")}/> */}
      <Button className="w-full" type="submit">
        Ingresar
      </Button>
    </form>
  );
}

export default ProfileForm;
