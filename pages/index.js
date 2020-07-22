import React, { useState } from "react";
import PropTypes from "prop-types";
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
import {
  FaGlobeAfrica,
  FaGlobeEurope,
  FaGlobeAmericas,
  FaGlobeAsia,
  FaLanguage,
} from "react-icons/fa";
import Flag from "../components/Flag";
import HeaderLinks from "../components/HeaderLinks";
import Layout from "../components/Layout";
import { withTranslation } from "../i18n";

const useStyles = makeStyles((theme) => ({
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

function Home({ totals, regions, t }) {
  const [rows, setRows] = useState(regions.world.list);
  const [watchList, setWatchList] = useState([]);
  const [hideWatchlist, setHideWatchlist] = useState(true);

  const handleAddWatchListItem = (row) => {
    setWatchList((prevState) => [...prevState, row]);
    localStorage.setItem("list", JSON.stringify(watchList));
    if (!watchList.length) {
      setHideWatchlist(false);
    }
  };

  const handleRemoveWatchListItem = (row) => {
    const filteredArr = watchList.filter(
      (item) => item.country !== row.country
    );
    if (!filteredArr.length) {
      setHideWatchlist(true);
    }
    setWatchList(filteredArr);
    localStorage.setItem("list", JSON.stringify(filteredArr));
  };

  React.useEffect(() => {
    const list = localStorage.getItem("list");

    if (list.length) {
      setWatchList(JSON.parse(list));
    }
  }, []);

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
      name: t("common:world"),
      country: regions.world.list,
      icon: <FaLanguage />,
    },
    {
      name: t("common:asia"),
      country: asia,
      icon: <FaGlobeAsia />,
    },
    {
      name: t("common:europe"),
      country: europe,
      icon: <FaGlobeEurope />,
    },
    {
      name: t("common:africa"),
      country: africa,
      icon: <FaGlobeAfrica />,
    },
    {
      name: t("common:southamerica"),
      country: southamerica,
      icon: <FaGlobeAmericas />,
    },
    {
      name: t("common:oceania"),
      country: oceania,
      icon: <FaGlobeAsia />,
    },
    {
      name: t("common:usa"),
      country: regions.unitedstates.list,
      icon: <Flag src="us" alt="us" />,
    },
    {
      name: t("common:canada"),
      country: regions.canada.list,
      icon: <Flag src="ca" alt="ca" />,
    },
    {
      name: t("common:china"),
      country: regions.china.list,
      icon: <Flag src="cn" alt="cn" />,
    },
    {
      name: t("common:australia"),
      country: regions.australia.list,
      icon: <Flag src="au" alt="au" />,
    },
    {
      name: t("common:russia"),
      country: regions.russia.list,
      icon: <Flag src="ru" alt="ru" />,
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
    <Layout>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={3}>
          <CardComponent item={uzbekistan} title={t("uz")} />

          <CardComponent item={totals} title={t("global")} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper className={classes.paper} elevation={3}>
            <CustomButtonGroup
              setRows={setRows}
              list={list}
              setPage={setPage}
            />
          </Paper>
          <Paper className={classes.paper} elevation={3} hidden={hideWatchlist}>
            <TableCollapse
              data={watchList}
              addWatchlistItem={handleAddWatchListItem}
              removeWatchlistItem={handleRemoveWatchListItem}
              hideWatchlist={hideWatchlist}
              watchlist={watchList}
              setWatchList={setWatchList}
            />
          </Paper>
          <Paper className={classes.paper} elevation={3}>
            <TableCollapse
              data={rows
                .sort((a, b) => b.confirmed - a.confirmed)
                .slice(pageStart, pageEnd)}
              addWatchlistItem={handleAddWatchListItem}
              removeWatchlistItem={handleRemoveWatchListItem}
              hideWatchlist={hideWatchlist}
              watchList={watchList}
              setWatchList={setWatchList}
              t={t}
            />
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data } = await Axios.get("https://cov19.cc/report.json");

  return {
    props: {
      totals: data.regions.world.totals,
      regions: data.regions,
      updated: data.last_updated,
      namespacesRequired: ["home", "common"],
    },
  };
}

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("home")(Home);
