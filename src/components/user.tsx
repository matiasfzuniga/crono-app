'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import { UserRound } from 'lucide-react';


const User = () => {
 
  return (
    <div className="absolute lg:right-4 top-6 right-7"><UserRound onClick={() => signOut()}/></div>
  )
}

export default User