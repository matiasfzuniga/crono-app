"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/dashboardStore";
import { calculatePercentageChange, calculatePercentage } from "@/lib/utils";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface StatusProp {
  status: string;
}

interface InfoDashProps {
  params: number;
  prevData: number;
  status: Array<StatusProp>;
}

const InfoDash: React.FC<InfoDashProps> = ({ params,prevData,status }) => {
  const { currentMonth, currentYear, changeMonth, setCurrentMonth, setCurrentYear } = useStore();
  const [percentageChange, setPercentageChange] = React.useState(0);
  const [percentageChangeObj, setPercentageChangeObj] = React.useState(0);

  useEffect(() => {
    const change = calculatePercentageChange(Math.trunc(params), Math.trunc(prevData));
    const changeObj = calculatePercentage(status.filter(workday => workday.status === 'complete').length,status.length)
    setPercentageChange(change)
    setPercentageChangeObj(changeObj)
  }, [params, prevData,status]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const yearParam = searchParams.get("y");
    const monthParam = searchParams.get("m");

    if (yearParam && monthParam) {
      setCurrentYear(parseInt(yearParam, 10));
      setCurrentMonth(parseInt(monthParam, 10) - 1);
    }
  }, [setCurrentYear, setCurrentMonth]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-4"
    >
      <Card className="bg-[#e0e0e00c] border-gray-900 border text-gray-300 shadow-lg p-4">
        <div className="flex justify-between items-center">
          <h1>Horas en {monthNames[currentMonth]}</h1>
          <Activity width={15} height={15} />
        </div>
        <p className={`${Math.trunc(params) !== 0 ? 'text-2xl font-semibold text-gray-400' : 'text-lg font-sans' }  pt-1`}>{Math.trunc(params) !== 0 ? Math.trunc(params) : 'Sin Datos'}</p>
        <p className="text-sm font-sans text-gray-400">
          {Math.trunc(params) !== 0 ? `${percentageChange > 0 ? '+' :''}${Math.trunc(percentageChange)} % respecto a ${monthNames[(currentMonth - 1 + 12) % 12]}` : <span>&nbsp;</span> }
        </p>
      </Card>
      <Card className="bg-[#e0e0e00c] border-gray-900 border text-gray-300 shadow-lg p-4">
        <div className="flex justify-between items-center">
          <h1>Objetivos</h1>
          <Check width={15} height={15}/>
        </div>
        {Math.trunc(params) !== 0 ? <div className="flex justify-between items-center h-14">   
        <p className="text-sm font-sans pt-10 text-gray-400">
          {`${status.filter(workday => workday.status === 'complete').length}/${status.length}`}
        </p>
        <p className="text-2xl font-semibold pt-10 text-gray-400">
          {Math.trunc(percentageChangeObj)}<span className="font-sans">%</span>
        </p>
        </div> : <div className="flex justify-center flex-col"><span className="text-lg font-sans pt-1 pb-1">Sin Datos</span><span>&nbsp;</span></div>}        
      </Card>
      <Card className="bg-[#e0e0e00c] border-gray-900 border text-gray-300 shadow-lg p-8 px-4 flex justify-center items-center flex-col">
        <div className="flex justify-between items-center">
          <h1>ELEGIR MES</h1>
        </div>
        <div className="text-2xl font-semibold pt-1 flex">
          <ChevronLeft onClick={() => changeMonth(-1)} />
          <span className="mx-2 py-1 text-sm text-gray-400">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <ChevronRight onClick={() => changeMonth(1)} />
        </div>
      </Card>
    </motion.div>
  );
};

export default InfoDash;