'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const LogOutComponent = () => {
  return (
    <div onClick={() => signOut()} className="pl-2"><LogOut size={17}/></div>
  )
}

export default LogOutComponent