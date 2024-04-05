"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuHeadContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Header = () => {
  const [theme, setThemes] = useState("light");
  const { setTheme } = useTheme();
  const toggleTheme = () => {
    setThemes(theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <div className="absolute lg:right-4 top-4 right-7">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
      <div className="absolute lg:left-4 top-4 left-7">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuHeadContent className="w-36 px-4 py-2">
            <DropdownMenuItem className="px-4 py-2">
              <Link href={"/"}>Inicio</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2">
              <Link href={"/jornada"}>Jornada</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2">Calendar</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2">Logout</DropdownMenuItem>
          </DropdownMenuHeadContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Header;
