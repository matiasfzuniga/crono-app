'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import { UserRound } from 'lucide-react';
import Link from "next/link";


const User = () => {
 
  return (
    <div className="absolute lg:right-10 top-10 right-7"> <Link href="/profile"><UserRound/></Link></div>
  )
}

export default User