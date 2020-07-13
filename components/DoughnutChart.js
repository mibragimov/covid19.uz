import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  percentage: {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  number: {
    display: "block",
    fontSize: "2rem",
    fontWeight: 700,
  },
  text: {
    fontSize: ".8rem",
    fontWeight: 600,
  },
}));

export default function DoughnutChart({ confirmed, recovered, deceased }) {
  const chartRef = useRef();
  let doughnutChart;

  const classes = useStyles();

  let percent = ((recovered / confirmed) * 100).toFixed(2);

  if (deceased) {
    percent = ((deceased / confirmed) * 100).toFixed(2);
  }

  useEffect(() => {
    doughnutChart = new Chart(chartRef.current, {
      type: "doughnut",
      data: data,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: deceased ? "Confirmed / Deceased" : "Confirmed / Recovered ",
          fontSize: 16,
        },
        layout: {
          padding: {
            bottom: 20,
          },
        },
      },
    });
  }, []);

  const data = {
    datasets: [
      {
        data: [confirmed, deceased ? deceased : recovered],
        backgroundColor: ["#00acc1", deceased ? "#f44336" : "#4caf50"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["confirmed", deceased ? "deceased" : "recovered"],
  };
  return (
    <div className={classes.root}>
      <div className={classes.percentage}>
        <span className={classes.number}>{percent + "%"}</span>
        <span className={classes.text}>
          {deceased ? "Deceased" : "Recovered"}
        </span>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
