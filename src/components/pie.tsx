"use client";
import React from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tag } from "lucide-react";

const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
);


const Pie = ({ params, color }: { params: string[], color:string[] }) => {
  const keys = Object.keys(params).map((key) => key.trim());
  const values = Object.values(params);
  const colorHex = Object.keys(color);
  const data = {
    labels: keys,
    datasets: [
      {
        label: "cantidad",
        data: values,
        borderWidth: 1,
        borderColor: "#070013",
        backgroundColor: colorHex,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center flex-col"
    >
      <Card className={`bg-[#e0e0e00c] shadow-lg border border-gray-900 p-6`}>
        <div className="flex justify-between items-center text-gray-300">
          <h1 className="text-xl">Tags más utilizados</h1>
          <Tag width={15} height={15}/>
        </div>
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                position: "right",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
            },
          }}
          height={"300px"}
          width={"300px"}
        />
      </Card>
    </motion.div>
  );
};

export default Pie;
