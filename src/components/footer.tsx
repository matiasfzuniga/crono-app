"use client";
import React from "react";
import { CalendarCheck, AlarmClock, BarChart4 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useStore } from "@/store/objetiveStore";
import { useTimeStore } from "@/store/timeStore";
import SlideTitle from "@/components/slideTitle";
import { usePathname } from 'next/navigation'

const Footer = () => {
  const { hour } = useTimeStore();
  const obj = useStore((state) => state.obj);
  const pathname = usePathname()

  return (
    <div className="bg-[#04040e] h-[150px] rounded-lg mx-2 my-4 flex justify-center items-center gap-4">
      <Link href={"/"}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`h-16 w-16 rounded-full ${
            parseInt(obj) == hour
              ? `border-[#2e8b2e] text-[#2e8b2e] hover:bg-[#2e8b2e46] ${pathname === '/'? 'bg-[#2e8b2e46]' : 'bg-[#0a0d16]'}`
              : parseInt(obj) > hour
              ? `border-[#FF7800] text-[#FF7800] hover:bg-[#ff5e0048] ${pathname === '/'? 'bg-[#ff5e0048]' : 'bg-[#0a0d16]'}`
              : `border-[#81D4FA] text-[#81D4FA] hover:bg-[#81d4fa2a] ${pathname === '/'? 'bg-[#81d4fa2a]' : 'bg-[#0a0d16]'}`
          } border`}
        >
          <AlarmClock
            width={35}
            height={35}
            color={`${
              parseInt(obj) == hour
                ? "#A5D6A7"
                : parseInt(obj) > hour
                ? "#dd9352"
                : "#81D4FA"
            }`}
          />
        </Button>
      </Link>
      <Link href={"/workday"}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`h-16 w-16 rounded-full ${
            parseInt(obj) == hour
              ? `border-[#2e8b2e] text-[#2e8b2e] hover:bg-[#2e8b2e46] ${pathname === '/workday'? 'bg-[#2e8b2e46]' : 'bg-[#0a0d16]'}`
              : parseInt(obj) > hour
              ? `border-[#FF7800] text-[#FF7800] hover:bg-[#ff5e0048] ${pathname === '/workday'? 'bg-[#ff5e0048]' : 'bg-[#0a0d16]'}`
              : `border-[#81D4FA] text-[#81D4FA] hover:bg-[#81d4fa2a] ${pathname === '/workday'? 'bg-[#81d4fa2a]' : 'bg-[#0a0d16]'}`
          } border`}
        >
          <CalendarCheck width={35} height={35} color={`${
              parseInt(obj) == hour
                ? "#A5D6A7"
                : parseInt(obj) > hour
                ? "#dd9352"
                : "#81D4FA"
            }`} />
        </Button>
      </Link>
      <Link href={"/dashboard"}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`h-16 w-16 rounded-full ${
            parseInt(obj) == hour
              ? `border-[#2e8b2e] text-[#2e8b2e] hover:bg-[#2e8b2e46] ${pathname === '/dashboard'? 'bg-[#2e8b2e46]' : 'bg-[#0a0d16]'}`
              : parseInt(obj) > hour
              ? `border-[#FF7800] text-[#FF7800] hover:bg-[#ff5e0048] ${pathname === '/dashboard'? 'bg-[#ff5e0048]' : 'bg-[#0a0d16]'}`
              : `border-[#81D4FA] text-[#81D4FA] hover:bg-[#81d4fa2a] ${pathname === '/dashboard'? 'bg-[#81d4fa2a]' : 'bg-[#0a0d16]'}`
          } border`}
        >
          <BarChart4 width={35} height={35} color={`${
              parseInt(obj) == hour
                ? "#A5D6A7"
                : parseInt(obj) > hour
                ? "#dd9352"
                : "#81D4FA"
            }`} />
        </Button>
      </Link>
      <SlideTitle/>
    </div>
  );
};

export default Footer;
