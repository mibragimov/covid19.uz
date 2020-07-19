import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.primary.A700,
    minWidth: 300,
    margin: "auto",
    paddingBottom: theme.spacing(2),
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
    fontSize: "2.5rem",
    fontWeight: 700,
  },
  text: {
    fontSize: ".9rem",
    fontWeight: 500,
    display: "block",
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
      options: options,
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

  const options = {
    legend: { display: false },
    title: {
      display: true,
      text: deceased ? "Confirmed / Deceased" : "Confirmed / Recovered ",
      fontSize: 20,
      fontColor: "#d8dce6",
    },

    elements: {
      arc: {
        borderWidth: 0,
        hoverBorderColor: 0,
      },
    },
  };
  return (
    <Paper className={classes.root} elevation={2}>
      <Box className={classes.percentage}>
        <span className={classes.number}>{Math.abs(percent) + "%"}</span>
        <span className={classes.text}>
          {deceased ? "Deceased" : "Recovered"}
        </span>
      </Box>
      <canvas ref={chartRef}></canvas>
    </Paper>
  );
}
