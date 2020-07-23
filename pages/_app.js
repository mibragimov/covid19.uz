import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import App from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { appWithTranslation } from "../i18n";

function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Coronavirus info | cov19.uz</title>
        <meta name="robots" content="Коронавирус инфекцияси (COVID-19)"></meta>
        <meta
          name="googlebot"
          content="Коронавирус инфекцияси (COVID-19)"
        ></meta>
        <meta property="og:title" content="Coronavirus info" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://cov19.uz/" />
        <meta property="og:locale" content="uz" />
        <meta
          property="og:image"
          content="https://unsplash.com/photos/awlMxCVBaIY"
        />
        <meta
          property="og:description"
          content="КОРОНАВИРУС ИНФЕКЦИЯСИ (COVID-19) ТЎҒРИСИДА МАЪЛУМОТЛАР"
        ></meta>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default appWithTranslation(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
