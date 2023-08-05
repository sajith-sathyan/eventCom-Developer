import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import "tailwindcss/tailwind.css";
import axios from "axios";

const LineChart = (props) => {
  const { Home, EventTicket, organizerHome, orgnzeEvent, viewEventPage } = props;
  const chartRef = useRef(null);
  const [allData, setAllData] = useState(null);

  console.log("alldata---------->", allData);
  useEffect(() => {
    // Create the chart instance
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Home",
            data: Home,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
         
          {
            label: "EventTicket",
            data: EventTicket,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Organizer Home",
            data: organizerHome,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Organizer Event",
            data: orgnzeEvent,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
          {
            label: "View Event",
            data: viewEventPage,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
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
  }, [allData]);

  console.log("home----->", Home);
  return (
    <div className="flex justify-center">
      <div className="w-50 h-64">
        <canvas ref={chartRef} width={200} height={200}></canvas>
      </div>
    </div>
  );
};

export default LineChart;
