import React from "react";
import LoginDrawer from "@/components/loginDrawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRound } from "lucide-react";

const Header = async ({ session }: any) => {
  return (
    <>
      {session?.user ? (
        <div className="p-2">
          <div className="absolute lg:right-5 top-8 right-7">
            <Link href={"/profile"} className="flex items-center">
              <Button
                variant="ghost"
                className="bg-[#808080] hover:bg-[#e0e0e0] rounded-full"
                size="icon"
              >
                <UserRound />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <LoginDrawer />
      )}
    </>
  );
};

export default Header;
