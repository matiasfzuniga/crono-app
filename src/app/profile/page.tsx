import React from 'react'
import { getServerSession } from "next-auth";
import { Button } from '@/components/ui/button';

const Profile = async () => {  
    const session = await getServerSession();
  return (
    <div className="flex justify-center items-center flex-col lg:p-10 pt-16">
        <h1>{session?.user?.name}</h1>
        <h3>objetivo:</h3>
        <p>8 horas por día</p>
        <Button variant={"destructive"} className='w-30'>Cerrar Sessión</Button>
    </div>
  )
}

export default Profile