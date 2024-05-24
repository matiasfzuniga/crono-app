'use client'
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function WorkDayPage({params}: {
  params : {id:string}
}) {

  return <div className="flex justify-center items-center flex-col lg:p-10 pt-16 h-[73vh]">
    <ChevronLeft className="mb-10" onClick={() => history.go(-1)} height={40} width={40}/>
    <h1 className="text-3xl">este es el registro número <span>{params.id}</span></h1>
    <div className="flex justify-center items-center flex-col p-4">
      <h1 className="text-lg font-semibold">título</h1>
      <h1 className="text-lg font-semibold">descripción</h1>
      <h1 className="text-lg font-semibold">tags</h1>
      <div className="p-4">
      <Button className="m-1">agregar</Button>
      <Button className="m-1">modificar</Button>
      <Button className="m-1">eliminar</Button>
      </div>
      
    </div>
  </div>
}

// history.go(-1);