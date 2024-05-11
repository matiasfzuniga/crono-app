"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function SignUp({open}:any) {
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
    <div>
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <form
            className="bg-white shadow-md rounded px-8 py-8"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <Input
                className={`border rounded w-full py-2 px-3 text-gray-700`}
                id="name"
                type="text"
                {...register("name", {
                  required: { value: true, message: "este campo es requerido" },
                })}
                placeholder="name"
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
        </DialogContent>
      </Dialog>
      </div>
  );
}

export default SignUp;
