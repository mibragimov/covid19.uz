/*eslint-disable*/
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../i18n";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Language, Translate } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// core components

import styles from "../jss/material-kit-react/components/headerLinksStyle";

const useStyles = makeStyles(styles);

function HeaderLinks({ t }) {
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
        <Link href="/about">
          <Button className={classes.navLink}>{t("about")}</Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <IconButton
          className={classes.navLink}
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "uz" : "en")
          }
        >
          <Translate />
          {i18n.language === "en" ? "en" : "uz"}
        </IconButton>
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(HeaderLinks);
