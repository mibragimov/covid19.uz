import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import HeaderLinks from "./HeaderLinks";
import HeaderLInksRight from "./HeaderLInksRight";

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
