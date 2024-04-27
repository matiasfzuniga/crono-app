'use client'
import React from "react";
import { useForm } from "react-hook-form";
function SignIn() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const onSubmit =handleSubmit( async data => {
    const res = await fetch('/api/register', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const resJSON = await res
    console.log(resJSON)
   
  })
  return (
      <div className="flex justify-center items-center pt-16">
        <form
          className="bg-white shadow-md rounded px-8 py-8"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              className={`border rounded w-full py-2 px-3 text-gray-700`}
              id="name"
              type="text"
              { ...register ("name", {
                required:{value:true,
                  message:"este campo es requerido"},
              })}
              placeholder="name"
            />
            {
              errors.name &&  (
                <span className="text-red-500">
                  {errors.name.message}
                </span>
              )
            }
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              className={`border rounded w-full py-2 px-3 text-gray-700`}
              id="email"
              type="email"
              { ...register ("email", {
                required:{value:true,
                  message:"este campo es requerido"},
              })}
              placeholder="email"
            />
             {
              errors.email &&  (
                <span className="text-red-500">
                  {errors.email.message}
                </span>
              )
            }
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadowborder rounded w-full py-2 px-3 text-gray-700 mb-3`}
              id="password"
              type="current-password"
              { ...register ("password", {
                required:{value:true,
                message:"este campo es requerido"
                },
                
              })}
              placeholder="***********"
            />
             {
              errors.password &&  (
                <span className="text-red-500">
                  {errors.password.message}
                </span>
              )
            }
          </div>

          <button className="w-full h-10">register</button>
        </form>
      </div>
  );
}

export default SignIn;