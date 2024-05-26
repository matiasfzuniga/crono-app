"use client";
import React from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { motion} from "framer-motion";
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Doughnut), {
  ssr: false,
});

const pie = ({params}:{params:string[]}) => {
  const keys = Object.keys(params).map(key => key.trim());
  const values = Object.values(params)
  const data = {
    labels: keys,
    datasets: [
      {
        label: "cantidad",
        data: values,
        borderWidth: 1,
        borderColor: '#ff5e00',
        backgroundColor: [
          "rgb(255, 60, 102)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 96)",
          "rgb(55, 55, 16)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <motion.div initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }} className="flex justify-center items-center flex-col p-4 rounded-lg bg-[#cccccc41]">
      <h1 className="text-xl">Tags más utilizados</h1>
      <Pie data={data} options={{plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }}} height={'300px'} width={'300px'}/>
    </motion.div>
  );
};

export default pie;
