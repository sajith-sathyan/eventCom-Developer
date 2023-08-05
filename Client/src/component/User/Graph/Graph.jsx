import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import "tailwindcss/tailwind.css";
import axiosInstance from "../../../Helper/axiosInstance"

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Create the chart instance
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Sales",
            data: [50, 75, 80, 65, 90, 100],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Sales",
            data: [50, 75, 30, 35, 40, 100],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-50 h-64">
        <canvas ref={chartRef} width={200} height={200}></canvas>
      </div>
    </div>
  );
};

export default LineChart;
