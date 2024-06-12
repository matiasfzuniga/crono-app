"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/objetiveStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import LogOutComponent from "@/components/logOut";

const Profile = () => {
  const { data: session } = useSession();
  const updateObj = useStore((state) => state.updateObj);
  const obj = useStore((state) => state.obj);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center flex-col lg:p-10 pt-16 h-[73vh]"
    >
      <div className="flex justify-center items-center flex-col">
      <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
        <Image
          src="/fp01.jpg"
          alt="mz"
          width={250}
          height={250}
          loading="lazy"
          className="w-full h-full object-cover transform scale-110"
        />
      </div>
      <h1 className="text-2xl py-3 font-semibold text-gray-200">{session?.user?.name}</h1>
      </div>
      <div className="border border-gray-600 p-4 m-2 rounded-lg">
        <h1 className="text-white">parametros</h1>
      <div className="flex">
      <Accordion
        type="single"
        collapsible
        className="flex justify-center items-center h-[80px] w-[160px] relative mt-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-[155px] absolute bottom-14 left-1 hover:no-underline font-semibold text-gray-400">
            Setear objetivo
          </AccordionTrigger>
          <AccordionContent className="w-[180px] flex justify-center items-center">
            <Input
              type="number"
              min={1}
              max={24}
              className="w-[42px] h-[38px] focus-visible:ring-offset-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[#3a3a3a] border-none"
              value={obj}
              onChange={(e) => updateObj(e.currentTarget.value)}
            />
            <p className="px-2 text-gray-400">horas por día</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="flex justify-center items-center h-[80px] w-[160px] relative mt-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-[155px] absolute bottom-14 left-1 hover:no-underline font-semibold text-gray-400">
            Setear texto
          </AccordionTrigger>
          <AccordionContent className="w-[180px] flex justify-center items-center">
            <Input
              type="text"
              min={1}
              max={24}
              className="w-[42px] h-[38px] focus-visible:ring-offset-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[#3a3a3a] border-none"
            />           
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      </div>
      <div className="flex justify-center text-gray-200 w-24 bg-gray-800 p-2 mt-2 cursor-pointer rounded-lg">
      <LogOutComponent/>
      </div>
      
    </motion.div>
  );
};

export default Profile;
