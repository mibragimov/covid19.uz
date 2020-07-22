import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DoughnutChart from "./DoughnutChart";
import Flag from "./Flag";
import { numberWithCommas } from "../utils/numberWithCommas";
import {
  FaHeartbeat,
  FaPlusCircle,
  FaMinusCircle,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { withTranslation, i18n } from "../i18n";
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/uz.json"));
countries.registerLocale(require("i18n-iso-countries/langs/ru.json"));

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  paper: {
    padding: 2,
    textAlign: "center",
    border: "none",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  span: {
    fontSize: ".8rem",
  },
  heartBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  heart: {
    fontSize: "2rem",
    color: theme.palette.info.main,
    marginRight: theme.spacing(1),
  },
  color: {
    color: theme.palette.warning.light,
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
  white: {
    color: theme.palette.text.primary,
  },
  iconBtn: {
    color: theme.palette.error.main,
  },
}));

function Row({ t, row, addWatchlistItem, removeWatchlistItem }) {
  const [open, setOpen] = React.useState(false);
  const [isWatchlisted, setIsWatchlisted] = React.useState(false);
  const classes = useRowStyles();

  React.useEffect(() => {
    const list = localStorage.getItem("list");

    if (list) {
      const x = JSON.parse(list).find((item) => item.country === row.country);
      setIsWatchlisted(x);
    }
  }, []);

  let currLang = i18n.language === "uz" ? "uz" : "en";

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {isWatchlisted ? (
            <IconButton
              aria-label="expand row"
              size="small"
              className={classes.color}
              onClick={() => removeWatchlistItem(row)}
            >
              <FaStar />
            </IconButton>
          ) : (
            <IconButton
              aria-label="expand row"
              size="small"
              className={classes.color}
              onClick={() => addWatchlistItem(row)}
            >
              <FaRegStar />
            </IconButton>
          )}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className={classes.iconBtn}
          >
            {open ? <FaMinusCircle /> : <FaPlusCircle />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.head}>
          <Flag src={row.country_code} alt={row.country_code} m />
          <Typography variant="subtitle1">
            {row.state
              ? row.state
              : countries.getName(row.country_code, currLang)}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <Typography className={classes.confirmed}>
            {numberWithCommas(row.confirmed)}
          </Typography>
          <span className={classNames(classes.span, classes.confirmed)}>
            {row.daily_confirmed && row.daily_confirmed !== -1
              ? `+${row.daily_confirmed}`
              : null}
          </span>
        </TableCell>
        <TableCell align="right">
          <Typography className={classes.deaths}>
            {row.deaths !== -1 ? numberWithCommas(row.deaths) : t("unknown")}
          </Typography>
          <span className={classNames(classes.span, classes.deaths)}>
            {row.daily_deaths && row.daily_deaths !== -1
              ? `+${row.daily_deaths}`
              : ""}
          </span>
        </TableCell>
        <TableCell align="right">
          <Typography className={classes.critical}>
            {row.critical !== -1
              ? numberWithCommas(row.critical)
              : t("unknown")}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography className={classes.active}>
            {numberWithCommas(row.confirmed - row.recovered - row.deaths)}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <Typography className={classes.tests}>
            {row.tests !== -1 ? numberWithCommas(row.tests) : t("unknown")}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography className={classes.recovered}>
            {row.recovered !== -1
              ? numberWithCommas(row.recovered)
              : t("unknown")}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Box component="span" className={classes.heartBox}>
                <FaHeartbeat className={classes.heart} />
                <Typography variant="h5">{t("ratios")}</Typography>
              </Box>
              <Grid
                container
                spacing={3}
                alignContent="center"
                justify="center"
              >
                <Grid item xs={12} md={6}>
                  <DoughnutChart
                    confirmed={row.confirmed}
                    recovered={row.recovered}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DoughnutChart
                    confirmed={row.confirmed}
                    deceased={row.deaths}
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Row);
