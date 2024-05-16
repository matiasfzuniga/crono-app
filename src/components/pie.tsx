"use client";
import React from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
  ssr: false,
});

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const pie = () => {
  return (
    <div>
      <h1>Example 3: Bar Chart</h1>
      <Pie data={data} height={'200px'} width={'200px'}/>
    </div>
  );
};

export default pie;
