'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const LogOutComponent = () => {
  return (
    <div onClick={() => signOut()} className="flex items-center cursor-pointer">Logout<LogOut size={17} className='ml-1'/></div>
  )
}

export default LogOutComponent