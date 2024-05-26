import React from "react";
import LoginDrawer from "@/components/loginDrawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuHeadContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRound,LogOut,Pencil } from "lucide-react";

const Header = async ({ session }: any) => {
  let fecha = Date.now();
  const hoy = new Date(fecha);
  let resultado = hoy.toLocaleDateString("en-GB");
  return (
    <>
      {session?.user ? (
        <div className="p-2">
          <div className="absolute lg:left-10 top-8 left-7">{resultado}</div>
          <div className="absolute lg:right-5 top-8 right-7">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="bg-[#ffa04d] hover:bg-[#ff5e00] rounded-full" size="icon">
              <UserRound />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuHeadContent className="w-36 px-3 py-2 mr-2 bg-[#FF7800]">
              <DropdownMenuItem className="px-4 py-2 focus:bg-[#ffa04d]">
                <Link href={"/"}>Inicio</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 focus:bg-[#ffa04d]">
                <Link href={"/profile"}>Config</Link><Pencil className="pl-2"/>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 focus:bg-[#ffa04d]">Logout<LogOut className="pl-2"/></DropdownMenuItem>
            </DropdownMenuHeadContent>
          </DropdownMenu>
          </div>
        </div>
      ) : (
        <LoginDrawer />
      )}
    </>
  );
};

export default Header;
