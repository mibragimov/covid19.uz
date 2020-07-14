import Head from "next/head";
import React, { useState } from "react";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import CardComponent from "../components/Card";
import TableCollapse from "../components/TableCollapse";
import Pagination from "../components/Pagination";
import CustomButtonGroup from "../components/CustomButtonGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },
  box: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
  grid: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}));

export default function Home({ totals, regions }) {
  const [rows, setRows] = useState(regions.world.list);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageStart = page * rowsPerPage;
  const pageEnd = page * rowsPerPage + rowsPerPage;

  // Styles
  const classes = useStyles();

  const asia = mergeLists(regions.asia.list, regions.world.list);
  const europe = mergeLists(regions.europe.list, regions.world.list);
  const africa = mergeLists(regions.africa.list, regions.world.list);
  const southamerica = mergeLists(
    regions.southamerica.list,
    regions.world.list
  );
  const oceania = mergeLists(regions.oceania.list, regions.world.list);
  const uzbekistan = regions.world.list.find(
    (ctry) => ctry.country_code === "uz"
  );

  const list = [
    {
      name: "World",
      country: regions.world.list,
    },
    {
      name: "Asia",
      country: asia,
    },
    {
      name: "Europe",
      country: europe,
    },
    {
      name: "Africa",
      country: africa,
    },
    {
      name: "South America",
      country: southamerica,
    },
    {
      name: "Oceania",
      country: oceania,
    },
    {
      name: "USA",
      country: regions.unitedstates.list,
    },
    {
      name: "Canada",
      country: regions.canada.list,
    },
    {
      name: "China",
      country: regions.china.list,
    },
    {
      name: "Australia",
      country: regions.australia.list,
    },
    {
      name: "Russia",
      country: regions.russia.list,
    },
  ];

  function mergeLists(listA, listB) {
    let arr = [];
    for (let code of listA) {
      for (let country of listB) {
        if (country.country_code === code) {
          arr.push(country);
        }
      }
    }
    return arr;
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>Covid19 tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={3}>
          <CardComponent item={uzbekistan} />

          <CardComponent item={totals} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper className={classes.paper} elevation={3}>
            <CustomButtonGroup handleClick={setRows} list={list} />
          </Paper>
          <Paper className={classes.paper} elevation={3}>
            <TableCollapse data={rows.slice(pageStart, pageEnd)} />
            <Pagination
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              count={rows.length}
            />
          </Paper>
        </Grid>
      </Grid>
      <Box className={classes.box}>
        <Typography variant="caption">2020 @mibragimov</Typography>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await Axios.get("https://cov19.cc/report.json");

  return {
    props: {
      totals: data.regions.world.totals,
      regions: data.regions,
      updated: data.last_updated,
    },
  };
}
