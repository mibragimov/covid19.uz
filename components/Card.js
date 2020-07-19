import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import classNames from "classnames";
import { numberWithCommas } from "../utils/numberWithCommas";
import StyledBadge from "./StyledBadge";
import { FaBullhorn, FaLink, FaFacebookF, FaTwitter } from "react-icons/fa";
import Icon from "./Icon";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    minHeight: 469,
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  pos: {
    marginBottom: 12,
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 700,
  },
  h3: {
    fontWeight: 700,
  },
  span: {
    display: "block",
    fontSize: "1.3rem",
    fontWeight: 500,
    color: theme.palette.primary.contrastText,
    lineHeight: 1.6,
  },
  textBox: {
    display: "flex",
    alignItems: "center",
  },
  bullhorn: {
    fontSize: "1rem",
    marginRight: theme.spacing(0.5),
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
}));

export default function CardComponent({ item, title }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
      <CardContent>
        <Box className={classes.box}>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
          <StyledBadge />
        </Box>

        <Box marginBottom={2} className={classes.textBox}>
          <FaBullhorn className={classes.bullhorn} />
          <Typography variant="caption">
            specific country data may be delayed
          </Typography>
        </Box>

        <Typography
          variant="h4"
          className={classNames(classes.h3, classes.confirmed)}
        >
          {numberWithCommas(item.confirmed)}
          <span className={classes.span}>Confirmed Cases</span>
        </Typography>
        <Typography
          variant="h4"
          className={classNames(classes.h3, classes.recovered)}
        >
          {numberWithCommas(item.recovered)}
          <span className={classes.span}>Recovered</span>
        </Typography>
        <Typography
          variant="h4"
          className={classNames(classes.h3, classes.active)}
        >
          {numberWithCommas(item.confirmed - item.recovered - item.deaths)}
          <span className={classes.span}>Active</span>
        </Typography>
        <Typography
          variant="h4"
          className={classNames(classes.h3, classes.critical)}
        >
          {numberWithCommas(item.critical)}
          <span className={classes.span}>Critical</span>
        </Typography>
        <Typography
          variant="h4"
          className={classNames(classes.h3, classes.deaths)}
        >
          {numberWithCommas(item.deaths)}
          <span className={classes.span}>Deaths</span>
        </Typography>

        <Box marginBottom={2} marginTop={2}>
          <Icon title="Copy Link" icon="link">
            <FaLink />
          </Icon>

          <Icon title="Share to Facebook" icon="facebook">
            <FaFacebookF />
          </Icon>

          <Icon title="Share to Twitter" icon="twitter">
            <FaTwitter />
          </Icon>
        </Box>

        <Typography variant="caption">
          Last updated: {moment(item.last_updated).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
}
