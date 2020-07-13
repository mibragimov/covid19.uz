import Head from "next/head";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React, { useState } from "react";
import Header from "../components/Header";

import CardComponent from "../components/Card";
import TableCollapse from "../components/TableCollapse";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginTop: 5,
  },
}));

export default function Home({ totals, regions }) {
  const [arr, setArr] = useState(regions.world.list);

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
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <CardComponent item={uzbekistan} />
            <CardComponent item={totals} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <Button onClick={() => setArr(regions.world.list)}>World</Button>
              <Button onClick={() => setArr(europe)}>Europe</Button>
              <Button onClick={() => setArr(africa)}>Africa</Button>
              <Button onClick={() => setArr(asia)}>Asia</Button>
              <Button onClick={() => setArr(southamerica)}>
                South America
              </Button>
              <Button onClick={() => setArr(oceania)}>Oceania</Button>

              <Button onClick={() => setArr(regions.unitedstates.list)}>
                USA
              </Button>
              <Button onClick={() => setArr(regions.canada.list)}>
                Canada
              </Button>
              <Button onClick={() => setArr(regions.china.list)}>China</Button>
              <Button onClick={() => setArr(regions.australia.list)}>
                Australia
              </Button>
              <Button onClick={() => setArr(regions.italy.list)}>Italy</Button>
              <Button onClick={() => setArr(regions.russia.list)}>
                Russia
              </Button>
            </ButtonGroup>
          </Paper>
          <Paper className={classes.paper}>
            <TableCollapse data={arr} />
          </Paper>
        </Grid>
      </Grid>
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
