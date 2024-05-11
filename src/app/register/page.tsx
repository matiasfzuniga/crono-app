"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Hubo un problema al enviar los datos.");
    }
  });
  return (
<div className="bg-black/80 h-screen flex justify-center items-center">
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
          <form
            className="px-8 py-8"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre
              </label>
              <Input
                className={`border rounded w-full py-2 px-3 text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0`}
                id="name"
                type="text"
                {...register("name", {
                  required: { value: true, message: "este campo es requerido" },
                })}
                placeholder="nombre"
              />
              {errors.name && (
                <span className="text-red-500">asd</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Input
                className={`border rounded w-full py-2 px-3 text-gray-700`}
                id="email"
                type="email"
                {...register("email", {
                  required: { value: true, message: "este campo es requerido" },
                })}
                placeholder="email"
              />
              {errors.email && (
                <span className="text-red-500">asd</span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                className={`shadowborder rounded w-full py-2 px-3 text-gray-700 mb-3`}
                id="password"
                type="current-password"
                {...register("password", {
                  required: { value: true, message: "este campo es requerido" },
                })}
                placeholder="***********"
              />
              {errors.password && (
                <span className="text-red-500">asd</span>
              )}
            </div>
            <Button className="w-full h-10">register</Button>
          </form>
          <Link href={"/login"} className="w-full text-center">Login</Link>
        </div>
      
      </div>
  );
}

export default SignUp;
