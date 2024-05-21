import React from "react";
import LoginDrawer from "@/components/loginDrawer";
import User from "./user";

const Header = async ({session}:any) => {
 let fecha = Date.now()
 const hoy = new Date(fecha);
 let resultado = hoy.toLocaleDateString("en-GB")
  return (
    <>
      {session?.user ? (
        <div className="p-2">
          <div className="absolute lg:left-10 top-8 left-7">
          {resultado}
          </div>
          <User />
        </div>
      ) : (
        <LoginDrawer />
      )}
    </>
  );
};

export default Header;
