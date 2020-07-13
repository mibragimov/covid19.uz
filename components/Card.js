import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { numberWithCommas } from "../utils/numberWithCommas";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    minHeight: 400,
    marginBottom: 10,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function CardComponent({ item }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root} color={theme.palette.success}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Uzbekistan Covid19 stats
        </Typography>
        <Typography variant="h5" component="h2">
          Confirmed Cases: {numberWithCommas(item.confirmed)}{" "}
          {item.daily_confirmed && item.daily_confirmed !== -1
            ? `+${item.daily_confirmed}`
            : ""}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Recovered: {numberWithCommas(item.recovered)}
          <br />
          Active:{" "}
          {numberWithCommas(item.confirmed - item.recovered - item.deaths)}
          <br />
          Critical: {numberWithCommas(item.critical)}
          <br />
        </Typography>
        <Typography variant="body2" component="p">
          Death: {numberWithCommas(item.deaths)}{" "}
          {item.daily_deaths && item.daily_deaths !== -1
            ? `+${item.daily_deaths}`
            : ""}
        </Typography>
        Last updated: {moment(item.last_updated).fromNow()}
      </CardContent>
    </Card>
  );
}
