"use client";
import React from 'react'
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { signOut } from "next-auth/react";

const Profile = () => {  
  const { data: session } = useSession();
  return (
    <div className="flex justify-center items-center flex-col lg:p-10 pt-16 h-[73vh]">
        <h1>{session?.user?.name}</h1>
        <h3>objetivo:</h3>
        <p>8 horas por día</p>
        <Button variant={"destructive"} className='w-30' onClick={() => signOut()}>Cerrar Sessión</Button>
    </div>
  )
}

export default Profile