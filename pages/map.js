import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { Typography, makeStyles, Box } from "@material-ui/core";
import Flag from "../components/Flag";
import MapChart from "../components/MapChart";
import { numberWithCommas } from "../utils/numberWithCommas";
import Header from "../components/Header";
import HeaderLinks from "../components/HeaderLinks";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  span: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  p: {
    fontWeight: 600,

    "& span": {
      marginLeft: theme.spacing(2),
    },
  },
  confirmed: {
    color: theme.palette.info.main,
  },
  recovered: {
    color: theme.palette.success.main,
  },
  active: {
    color: theme.palette.warning.main,
  },
  critical: {
    color: theme.palette.secondary.main,
  },
  deaths: {
    color: theme.palette.error.main,
  },
  tests: {
    color: theme.palette.warning.dark,
  },
}));

export default function Map({ world }) {
  const [content, setContent] = useState("");

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header color="primary" brand="Cov19.uz" leftLinks={<HeaderLinks />} />
      <MapChart setTooltipContent={setContent} world={world} />
      <ReactTooltip backgroundColor="#1B2435">
        {content ? (
          <Box>
            <Box component="span" className={classes.span}>
              <Flag src={content.country_code} alt={content.country} />
              <Typography>{content.country}</Typography>
            </Box>

            <Box className={classes.box}>
              <Typography variant="caption" className={classes.p}>
                Confirmed:
                <span className={classes.confirmed}>
                  {content.confirmed === -1
                    ? "Unknown"
                    : numberWithCommas(content.confirmed)}
                </span>
              </Typography>

              <Typography variant="caption" className={classes.p}>
                Recovered:
                <span className={classes.recovered}>
                  {content.recovered === -1
                    ? "Unknown"
                    : numberWithCommas(content.recovered)}
                </span>
              </Typography>

              <Typography variant="caption" className={classes.p}>
                Active:
                <span className={classes.active}>
                  {content.confirmed === -1
                    ? "Unknown"
                    : numberWithCommas(
                        content.confirmed - content.recovered - content.deaths
                      )}
                </span>
              </Typography>

              <Typography variant="caption" className={classes.p}>
                Deaths:
                <span className={classes.deaths} variant="caption">
                  {content.deaths === -1
                    ? "Unknown"
                    : numberWithCommas(content.deaths)}
                </span>
              </Typography>
              <Typography variant="caption" className={classes.p}>
                Tests:
                <span className={classes.tests} variant="caption">
                  {content.tests === -1
                    ? "Unknown"
                    : numberWithCommas(content.tests)}
                </span>
              </Typography>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </ReactTooltip>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get("https://cov19.cc/report.json");

  return {
    props: {
      totals: data.regions.world.totals,
      world: data.regions.world,
      updated: data.last_updated,
    },
  };
}
