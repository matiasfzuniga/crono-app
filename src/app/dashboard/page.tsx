import React from "react";
import Pie from "@/components/pie";
import FileChart from "@/components/fileChart";
import BarChart from "@/components/barChart";

const page = async () => {
  return (
    <div className="flex justify-center items-center flex-col lg:p-10 pt-16">
      <h1 className="text-3xl pb-12">Estadisticas</h1>
      <div className="flex justify-center items-center gap-4 pb-5">
        <BarChart />
        <FileChart />
      </div>
      <Pie />
    </div>
  );
};

export default page;
