"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/objetiveStore";
import { motion } from "framer-motion";
import LogOutComponent from "@/components/logOut";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ColorPicker from "@/components/colorPicker";

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
      <div className="flex justify-between items-start bg-[#e0e0e00c] border border-gray-900 p-4 rounded-lg w-[600px]">
        <div className="flex">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <Image
              src="/fp01.jpg"
              alt="mz"
              width={250}
              height={250}
              loading="lazy"
              className="w-full h-full object-cover transform scale-110"
            />
          </div>
          <div className="pl-10 pt-2">
            <p className="text-gray-400 font-mono text-xs">USER</p>
            <h1 className="text-2xl font-semibold text-gray-200">
              {session?.user?.name}
            </h1>
            <p className="text-gray-400 font-mono text-xs">EMAIL</p>
            <p className="text-gray-200 font-sans">matiaszuniga93@gmail.com</p>
          </div>
        </div>
        <div className="flex justify-center text-gray-200 w-24 h-10 bg-gray-800 hover:bg-red-800 p-2 mt-2 cursor-pointer rounded-lg">
          <LogOutComponent />
        </div>
      </div>
      <div className="flex">
        <div className="flex-col justify-center">
          <h1 className="text-gray-300 pt-3 pl-7 font-semibold text-sm">
            S E T &nbsp; G O A L S
          </h1>
          <div className="flex bg-[#e0e0e00c] border border-gray-900 p-4 m-2 rounded-lg">
            <div className=" h-[80px] w-[160px] flex justify-center items-center">
              <Input
                type="number"
                min={1}
                max={24}
                className="w-[42px] h-[38px] focus-visible:ring-offset-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-700 border-none"
                value={obj}
                onChange={(e) => updateObj(e.currentTarget.value)}
              />
              <p className="px-2 text-gray-400">hours per day</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-gray-300 pt-3 pl-7 font-semibold text-sm">
            S E T &nbsp; C O L O R &nbsp; I N &nbsp; T A G S
          </h1>
          <div className="flex justify-center items-center bg-[#e0e0e00c] border border-gray-900 rounded-lg w-[390px] h-full pr-10 m-2 text-gray-200">
            <div className="flex justify-center items-center flex-col px-2">
              <p className="pb-2 text-gray-400 font-mono text-xs">TAG</p>
              <div className="flex justify-center items-center">
                <ChevronLeft />
                <p className="bg-gray-700 px-3 py-1 my-1 rounded-lg">js</p>
                <ChevronRight />
              </div>
            </div>
            <div className="flex justify-center items-center flex-col px-2">
              <p className="pb-2 text-gray-400 font-mono text-xs">COLOR CODE</p>
              <ColorPicker />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
