import React from "react";
import Pie from "@/components/pie";
import InfoDash from "@/components/infoDash";
import { headers } from "next/headers";

async function getData() {
  const response = await fetch("http://localhost:3000/api/dashboard", {
    method: "GET",
    headers: headers(),
  });
  if (!response.ok) {
    throw new Error("Hubo un problema al enviar los datos.");
  }
  let datos = await response.json();
  return datos;
}

const page = async () => {
  const data = await getData()
  return (
    <div className="flex justify-center items-center flex-col lg:p-10 pt-16 h-[73vh]">
       <h1 className="text-3xl pb-12">Estadísticas</h1>
      <div className="flex justify-center gap-4 pb-5">
        <InfoDash params={data.totalTimeInHoursThisMonth}/>
        <Pie params={data.tagCountMap}/>
      </div>
    </div>
  );
};

export default page;
