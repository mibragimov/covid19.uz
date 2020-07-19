import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DoughnutChart from "./DoughnutChart";
import { Avatar, Badge } from "@material-ui/core";
import { numberWithCommas } from "../utils/numberWithCommas";
import {
  AiOutlineStar,
  AiFillStar,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import uid from "uid";
import CustomIconButton from "./CustomIconButton";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  paper: {
    padding: 2,
    textAlign: "center",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  img: {
    marginRight: 5,
  },
  span: {
    fontSize: ".8rem",
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
}));

function Row({
  row,
  addWatchlistItem,
  removeWatchlistItem,
  hideWatchList,

  id,
}) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <CustomIconButton
            onRemoveItem={() => removeWatchlistItem(row)}
            onAddItem={() => addWatchlistItem(row)}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className={classes.white}
          >
            {open ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.head}>
          <Avatar
            src={`https://www.countryflags.io/${row.country_code}/flat/32.png`}
            alt={row.country_code}
            variant="rounded"
            className={classes.img}
          />
          <Typography variant="subtitle1">
            {row.state ? row.state : row.country}
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
            {row.deaths !== -1 ? numberWithCommas(row.deaths) : "Unknown"}
          </Typography>
          <span className={classNames(classes.span, classes.deaths)}>
            {row.daily_deaths && row.daily_deaths !== -1
              ? `+${row.daily_deaths}`
              : ""}
          </span>
        </TableCell>
        <TableCell align="right">
          <Typography className={classes.critical}>
            {row.critical !== -1 ? numberWithCommas(row.critical) : "Unknown"}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography className={classes.active}>
            {numberWithCommas(row.confirmed - row.recovered - row.deaths)}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <Typography className={classes.tests}>
            {row.tests !== -1 ? numberWithCommas(row.tests) : "Unknown"}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography className={classes.recovered}>
            {numberWithCommas(row.recovered)}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Ratios
              </Typography>
              <Grid
                container
                spacing={3}
                alignContent="center"
                justify="center"
              >
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} className={classes.paper}>
                    <DoughnutChart
                      confirmed={row.confirmed}
                      recovered={row.recovered}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} className={classes.paper}>
                    <DoughnutChart
                      confirmed={row.confirmed}
                      deceased={row.deaths}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useTableStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function Watchlist({
  data,
  addWatchlistItem,
  removeWatchlistItem,
  hideWatchList,
}) {
  const classes = useTableStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Confirmed</TableCell>
            <TableCell align="right">Deceased</TableCell>
            <TableCell align="right">Critical</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Tests</TableCell>
            <TableCell align="right">Recovered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const id = uid();

            return (
              <Row
                key={id}
                row={row}
                addWatchlistItem={addWatchlistItem}
                removeWatchlistItem={removeWatchlistItem}
                hideWatchList={hideWatchList}
                id={id}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
