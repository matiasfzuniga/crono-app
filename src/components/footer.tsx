import React from 'react'
import { CalendarCheck,AlarmClock,BarChart4 } from 'lucide-react';
import Link from "next/link";
import { Button } from './ui/button';

const Footer = () => {
  return (
    <div className="bg-[#FF7800] h-[150px] rounded-lg mx-2 my-4 flex justify-center items-center gap-4">
    <Link href={"/"}>
      <Button variant={"ghost"} size={"icon"} className='h-16 w-16 rounded-full bg-[#27201a] hover:bg-[#ff5e00]'>
    <AlarmClock width={35} height={35} color='#ffa810'/>      
    </Button>
    </Link>
    <Link href={"/workday"}>
    <Button variant={"ghost"} size={"icon"} className='h-16 w-16 rounded-full bg-[#27201a] hover:bg-[#ff5e00]'>
    <CalendarCheck width={35} height={35} color='#ffa810'/>
    </Button>
    </Link>
    <Link href={"/dashboard"}>
    <Button variant={"ghost"} size={"icon"} className='h-16 w-16 rounded-full bg-[#27201a] hover:bg-[#ff5e00]'>
    <BarChart4 width={35} height={35} color='#ffa810'/>
    </Button>
    </Link>
  </div> 
  )
}

export default Footer