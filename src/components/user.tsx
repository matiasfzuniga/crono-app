'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import { UserRound } from 'lucide-react';


const User = () => {
 
  return (
    <div className="absolute lg:right-10 top-10 right-7"><UserRound onClick={() => signOut()}/></div>
  )
}

export default User