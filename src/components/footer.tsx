import React from 'react'
import { CalendarClock, SquareUser, Home } from 'lucide-react';
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#FF7800] h-[150px] rounded-lg mx-2 my-4 flex justify-center items-center gap-8">
    <Link href={"/"}>
    <Home width={60} height={60}/>      
    </Link>
    <Link href={"/workday"}>
    <CalendarClock width={60} height={60}/>
    </Link>
    <Link href={"/profile"}>
    <SquareUser width={60} height={60}/>
    </Link>
  </div> 
  )
}

export default Footer