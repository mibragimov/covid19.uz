import React from "react";
import PropTypes from "prop-types";
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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DoughnutChart from "./DoughnutChart";
import { Avatar, Badge } from "@material-ui/core";
import { numberWithCommas } from "../utils/numberWithCommas";

const useRowStyles = makeStyles({
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
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.head}>
          <Avatar
            src={`https://www.countryflags.io/${row.country_code}/flat/32.png`}
            alt={row.country_code}
            variant="rounded"
            className={classes.img}
          />
          {row.state ? row.state : row.country}
        </TableCell>

        <TableCell align="right">
          {numberWithCommas(row.confirmed)}
          {row.daily_confirmed && row.daily_confirmed !== -1
            ? `+${row.daily_confirmed}`
            : null}
        </TableCell>
        <TableCell align="right">
          {row.deaths}{" "}
          {row.daily_deaths && row.daily_deaths !== -1
            ? `+${row.daily_deaths}`
            : ""}
        </TableCell>
        <TableCell align="right">{row.critical}</TableCell>
        <TableCell align="right">
          {numberWithCommas(row.confirmed - row.recovered - row.deaths)}
        </TableCell>

        <TableCell align="right">{numberWithCommas(row.tests)}</TableCell>
        <TableCell align="right">{numberWithCommas(row.recovered)}</TableCell>
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

export default function CollapsibleTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
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
          {data.map((row, idx) => (
            <Row key={idx} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
