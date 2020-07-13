import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js";

export default function DoughnutChart({ item }) {
  const { confirmed, recovered } = item;

  const chartRef = useRef();
  let doughnutChart;

  const percent = ((recovered / confirmed) * 100).toFixed(2);

  useEffect(() => {
    doughnutChart = new Chart(chartRef.current, {
      type: "doughnut",
      data: data,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Confirmed / Recovered ",
          fontSize: 16,
        },
      },
    });
  }, []);

  const data = {
    datasets: [
      {
        data: [confirmed, recovered],
        backgroundColor: ["red", "green"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["confirmed", "recovered"],
  };
  return (
    <div className="canvas-container">
      <div className="percantage">
        <span className="number">{percent + "%"}</span>
        <span className="text">recovered</span>
      </div>
      <canvas ref={chartRef}></canvas>

      <style jsx>{`
        .canvas-container {
          position: relative;
        }
        .percantage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }
        .number {
          display: block;
          font-size: 2rem;
        }
        .text {
          display: block;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
