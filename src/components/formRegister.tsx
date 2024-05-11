'use client'
import React from 'react'
import { useForm} from "react-hook-form";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

function ProfileForm({ className }: React.ComponentProps<"form">) {
    const { register, handleSubmit, formState: {errors}} = useForm()
    const router = useRouter()
  
    const onSubmit = handleSubmit(async data => {
      
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect:false
      });
      if(res?.error){
        alert(res.error)
      }else{
        router.push("/jornada")
      }
    })
      return (
        <form onSubmit={onSubmit}
         className={cn("grid items-start gap-4", className)}>     
            <Input type="email" id="email" {...register("email")}/>
            <Input type="password" id="password" autoComplete="on" {...register("password")}/>
            <Button className='w-full' type="submit">Ingresar</Button>
        </form>
      )
    }
    

export default ProfileForm