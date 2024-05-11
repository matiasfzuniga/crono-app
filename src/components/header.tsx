import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuHeadContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Login from "./login";
import User from "./user";
import { getServerSession } from "next-auth";

const Header = async () => {
  const session = await getServerSession();
  return (
    <>
      {session?.user ? (
        <div>
          <div className="absolute lg:left-4 top-4 left-7">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="focus:ring-0" variant="ghost" size="icon">
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
                <DropdownMenuItem className="px-4 py-2">
                  Calendar
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2">
                  LogIn
                </DropdownMenuItem>
              </DropdownMenuHeadContent>
            </DropdownMenu>
          </div>
          <User />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Header;
