"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormData , UserSchema, ValidFieldNames } from "@/lib/types";
import {FormField} from "@/components/formField";
import { zodResolver } from "@hookform/resolvers/zod";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), 
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await res.json()
    
    const {errors={}} = responseData
    const fieldErrorMapping: Record<string, ValidFieldNames> = {
      email: "email",
      name: "name",
      password: "password",
    };
    const fieldWithError = Object.keys(fieldErrorMapping).find(
      (field) => errors[field]
    );

    if (fieldWithError) {
      setError(fieldErrorMapping[fieldWithError], {
        type: "server",
        message: errors[fieldWithError],
      });
    }
    
    if (!res.ok) {
      throw new Error("Hubo un problema al enviar los datos.");
    }
  };
  return (
<div className="bg-black/80 h-screen flex justify-center items-center">
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
          <form
            className="px-8 py-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre
              </label>
              <FormField
              type="name"
              name="name"
              register={register}
              error={errors.name}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <FormField
              type="email"
              name="email"
              register={register}
              error={errors.email}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <FormField
              type="password"
              name="password"
              register={register}
              error={errors.password}
              />
            </div>
            <Button type="submit" className="w-full h-10">register</Button>
          </form>
          <Link href={"/login"} className="w-full text-center">Login</Link>
        </div>
      
      </div>
  );
}

export default SignUp;
