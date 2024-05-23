"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/objetiveStore";

const Profile = () => {
  const { data: session } = useSession();

  const updateObj = useStore((state) => state.updateObj)
  const obj = useStore(state => state.obj)
  
  return (
    <div className="flex justify-center items-center flex-col lg:p-10 pt-16 h-[73vh]">
        <Image
          src="/fp01.jpg"
          alt="mz"
          width={350}
          height={350}
          loading="lazy"
          className="w-52 h-52 rounded-full object-cover"
        />
      <h1 className="text-2xl py-3 font-semibold">{session?.user?.name}</h1>
      <h3>Setear objetivo:</h3>
      <div className="flex justify-center items-center py-4">
      <Input type="number" min={1} max={24} className="w-[42px] h-[38px] focus-visible:ring-offset-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[#FFBD83] border-none" value={obj} onChange={(e) => updateObj(e.currentTarget.value)}/><p className="px-2">horas por día</p>
      </div>
      <Button
        variant={"destructive"} 
        className="w-30"
        onClick={() => signOut()}
      >
        Cerrar Sessión
      </Button>
    </div>
  );
};

export default Profile;
