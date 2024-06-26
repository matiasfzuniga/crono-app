"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react"

const List = (items: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={`bg-[#e0e0e00c] hover:bg-[#e6e6e611] border border-gray-900 mt-4 w-[350px] rounded-lg ${isExpanded?'overflow-y-auto':'overflow-hidden'} cursor-pointer`}
      initial={{ height: 50 }}
      animate={{ height: isExpanded ? 2000 : 50 }}
      transition={{ duration: isExpanded ? 0.7 : 0.3}}
      onClick={handleExpandClick}
    >
      <div className={`flex justify-center items-end ${isExpanded?'':'pr-1'}`}>
      <h1 className={`text-sm pt-3 text-gray-200 font-mono cursor-pointer`}>
        TO DO LIST 
      </h1>
      <ChevronUp className={`${isExpanded?'transition-all duration-300 -rotate-180 ml-3':'ml-3'}`} size={20}/>
      </div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isExpanded ? -500 : -420 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full relative"
      >
        <motion.div
          className="absolute left-4 p-3"
          initial={{ y: 500 }}
          animate={{ y: 510 }}
          transition={{ duration: 0.5 }}
        >
          {items.items.map((item: string, index: number) => (
            <motion.h1
              key={index}
              className="text-sm pb-4 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              - {item}
            </motion.h1>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default List;
