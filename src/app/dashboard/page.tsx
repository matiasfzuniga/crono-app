import React from "react";
import Pie from "@/components/pie";
import InfoDash from "@/components/infoDash";
import { headers } from "next/headers";

async function getData(year: number, month: number) {
  const response = await fetch(`http://localhost:3000/api/dashboard?y=${year}&m=${month}`, {
    method: "GET",
    headers: headers(),
  });
  if (!response.ok) {
    throw new Error("Hubo un problema al enviar los datos.");
  }
  let datos = await response.json();
  return datos;
}

async function fetchMonthlyHours (year: number, month: number) {
  const response = await fetch(`http://localhost:3000/api/hours?y=${year}&m=${month}`, {
    method: 'GET',
    headers: headers(),
  });
  const data = await response.json();
  return data.totalHours;
};


const page = async ({ searchParams }: { searchParams: { y?: string, m?: string } }) => {
  const year = parseInt(searchParams.y || new Date().getFullYear().toString(), 10);
  const month = parseInt(searchParams.m || (new Date().getMonth() + 1).toString(), 10);
  const prevData = await fetchMonthlyHours(year,month-1)
  const data = await getData(year, month);
  return (
    <div className="flex justify-center items-center flex-col lg:p-10 pt-16 h-[73vh]">
       <h1 className="text-3xl pb-12 text-gray-200">Estadísticas</h1>
      <div className="flex justify-center gap-4 pb-5">
        <InfoDash params={data.totalTimeInHoursThisMonth} prevData={prevData} status={data.statusWorkday}/>
        <Pie params={data.tagCountMap} color={data.tagColor}/>
      </div>
    </div>
  );
};

export default page;
