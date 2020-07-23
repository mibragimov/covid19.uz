import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import HeaderLinks from "./HeaderLinks";
import HeaderLInksRight from "./HeaderLInksRight";
import { initGA, logPageView } from "../utils/analytics";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  // React.useEffect(() => {
  //   if (!window.GA_INITIALIZED) {
  //     initGA();
  //     window.GA_INITIALIZED = true;
  //   }
  //   logPageView();
  // }, []);
  return (
    <Box className={classes.root}>
      <Header
        leftLinks={<HeaderLinks />}
        rightLinks={<HeaderLInksRight />}
        brand="COV19.UZ"
        color="primary"
      />
      {children}
    </Box>
  );
}
