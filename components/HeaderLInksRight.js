/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../i18n";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Translate } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";

// core components

import styles from "../jss/material-kit-react/components/headerLinksStyle";

const useStyles = makeStyles(styles);

function HeaderLinks() {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <IconButton
          className={classes.navLink}
          onClick={() =>
            i18n.changeLanguage(i18n.language === "uz" ? "ru" : "uz")
          }
        >
          <Translate />
          {i18n.language === "ru" ? "uz" : "ru"}
        </IconButton>
      </ListItem>
    </List>
  );
}

export default HeaderLinks;
