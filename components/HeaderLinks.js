/*eslint-disable*/
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

// core components

import styles from "../jss/material-kit-react/components/headerLinksStyle";

const useStyles = makeStyles(styles);

function HeaderLinks({ t }) {
  let url =
    "https://www.who.int/ru/emergencies/diseases/novel-coronavirus-2019/advice-for-public";
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/">
          <Button className={classes.navLink}>{t("data")}</Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/map">
          <Button className={classes.navLink}>{t("map")}</Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <a href={url} target="_blank" className={classes.navLink}>
          {t("sources")}
        </a>
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(HeaderLinks);
