'use client'
import React from 'react'
import { Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
 } from "@/components/ui/drawer";
import ProfileForm from './formLogin';
import { useRouter } from 'next/navigation'

const LoginDrawer = ({openDrawer}:any) => {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  return (    
    <div className="absolute lg:right-4 top-6 right-7"> 
      <Drawer open={openDrawer ? openDrawer : open} onOpenChange={setOpen}>
      <DrawerContent className="flex justify-center items-center outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle>Iniciar sesion</DrawerTitle>
          <DrawerDescription>
            Ingrese su usuario y contraseña
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4"/>
        <DrawerFooter className="pt-2">
        <button type="button" onClick={() => router.push('/register')}>
         Registrate
        </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer> 
    </div>
  )
}

export default LoginDrawer

