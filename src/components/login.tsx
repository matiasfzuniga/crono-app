'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
import { Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerClose
 } from "@/components/ui/drawer";
 import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useSession,signIn,signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = ({props}:any) => {
    const [open, setOpen] = React.useState(false)
    const {data:session} = useSession();
    console.log(session)
  return (
    <div className="absolute lg:right-4 top-6 right-7">
      <Drawer open={props ? props : open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      {session?.user ? <UserRound /> : <Button variant={'outline'}>LogIn</Button>}     
      </DrawerTrigger>
      <DrawerContent className="flex justify-center items-center outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle>Iniciar sesion</DrawerTitle>
          <DrawerDescription>
            Ingrese su usuario y contraseña
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4"/>
        <DrawerFooter className="pt-2">  
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </div>
  )
}

export default Login

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
  