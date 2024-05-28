"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity,Check,ChevronLeft,ChevronRight } from 'lucide-react';

let currentMounth = "Mayo"

const InfoDash = ({ params }: { params: number }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-4"
    >
      <Card className="bg-[#FFBD83] shadow-lg border-none p-4">
        <div className="flex justify-between items-center">
        <h1>Horas en {currentMounth}</h1>
        <Activity width={15} height={15}/>
        </div>
        <p className="text-2xl font-semibold pt-1">{Math.trunc(params)}</p>
        <p className="text-sm font-sans">+25% más que {currentMounth}</p>
      </Card>
      <Card className="bg-[#FFBD83] shadow-lg border-none p-4">
        <div className="flex justify-between items-center">
        <h1>Objetivos</h1>
        <Check width={15} height={15}/>
        </div>
        <p className="text-2xl font-semibold pt-1">80<span className="font-sans">%</span></p>
        <p className="text-sm font-sans">+40% más que {currentMounth}</p>
      </Card>
      <Card className="bg-[#FFBD83] shadow-lg border-none p-8 flex justify-center items-center flex-col">
        <div className="flex justify-between items-center">
        <h1>ELEGIR MES</h1>
        </div>
        <div className="text-2xl font-semibold pt-1 flex"><ChevronLeft/><ChevronRight/></div>
      </Card>
    </motion.div>
  );
};

export default InfoDash;
