"use client";
import React from "react";
import { CalendarCheck, AlarmClock, BarChart4 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useStore } from "@/store/objetiveStore";
import { useTimeStore } from "@/store/timeStore";

const Footer = () => {
  const { hour } = useTimeStore();
  const obj = useStore((state) => state.obj);
  return (
    <div className="bg-[#070013] h-[150px] rounded-lg mx-2 my-4 flex justify-center items-center gap-4">
      <Link href={"/"}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`h-16 w-16 rounded-full ${
            parseInt(obj) == hour
              ? "border-[#A5D6A7] text-[#A5D6A7] hover:bg-[#a5d6a746]"
              : parseInt(obj) > hour
              ? "border-[#FF7800] text-[#FF7800] hover:bg-[#ff5e0048]"
              : "border-[#81D4FA] text-[#81D4FA] hover:bg-[#81d4fa2a]"
          } border bg-[#130f0c] `}
        >
          <AlarmClock
            width={35}
            height={35}
            color={`${
              parseInt(obj) == hour
                ? "#A5D6A7"
                : parseInt(obj) > hour
                ? "#ff5e00"
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
              ? "border-[#A5D6A7] text-[#A5D6A7] hover:bg-[#a5d6a746]"
              : parseInt(obj) > hour
              ? "border-[#FF7800] text-[#FF7800] hover:bg-[#ff5e0048]"
              : "border-[#81D4FA] text-[#81D4FA] hover:bg-[#81d4fa2a]"
          } border bg-[#130f0c] `}
        >
          <CalendarCheck width={35} height={35} color={`${
              parseInt(obj) == hour
                ? "#A5D6A7"
                : parseInt(obj) > hour
                ? "#ff5e00"
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
              ? "border-[#A5D6A7] text-[#A5D6A7] hover:bg-[#a5d6a746]"
              : parseInt(obj) > hour
              ? "border-[#FF7800] text-[#FF7800] hover:bg-[#ff5e0048]"
              : "border-[#81D4FA] text-[#81D4FA] hover:bg-[#81d4fa2a]"
          } border bg-[#130f0c] `}
        >
          <BarChart4 width={35} height={35} color={`${
              parseInt(obj) == hour
                ? "#A5D6A7"
                : parseInt(obj) > hour
                ? "#ff5e00"
                : "#81D4FA"
            }`} />
        </Button>
      </Link>
    </div>
  );
};

export default Footer;
