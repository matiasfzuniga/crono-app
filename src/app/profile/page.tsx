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
import { motion} from "framer-motion";

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
      <Image
        src="/fp01.jpg"
        alt="mz"
        width={350}
        height={350}
        loading="lazy"
        className="w-[180px] h-[180px] rounded-full object-cover"
      />
      <h1 className="text-2xl py-3 font-semibold">{session?.user?.name}</h1>
      <Accordion
        type="single"
        collapsible
        className="flex justify-center items-center h-[80px] w-[160px] relative mt-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-[155px] absolute bottom-14 left-1 hover:no-underline font-semibold">
            Setear objetivo
          </AccordionTrigger>
          <AccordionContent className="w-[180px] flex justify-center items-center">
            <Input
              type="number"
              min={1}
              max={24}
              className="w-[42px] h-[38px] focus-visible:ring-offset-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[#FFBD83] border-none"
              value={obj}
              onChange={(e) => updateObj(e.currentTarget.value)}
            />
            <p className="px-2">horas por día</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        variant={"destructive"}
        className="w-30"
        onClick={() => signOut()}
      >
        Cerrar Sessión
      </Button>
    </motion.div>
  );
};

export default Profile;
