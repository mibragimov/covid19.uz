import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withTranslation, i18n } from "../i18n";
import Input from "@material-ui/core/Input";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Row from "./Row";
import { Search } from "@material-ui/icons";
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/uz.json"));

const useTableStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
}));

function CollapsibleTable({
  data,
  addWatchlistItem,
  removeWatchlistItem,
  hideWatchList,
  watchList,
  setWatchList,
  t,
}) {
  const classes = useTableStyles();

  const [query, setQuery] = React.useState("");

  let currLang = i18n.language === "uz" ? "uz" : "en";

  const filteredArr = data.filter((item) => {
    let locale = countries.getName(item.country_code, currLang).toLowerCase();
    let term = query.toLowerCase().trim();

    if (item.state) {
      return item.state.toLowerCase().includes(term);
    }

    return locale.includes(term);
  });

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={12} align="right">
              <Input
                type="text"
                placeholder={t("search")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                startAdornment={<Search />}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell />
            <TableCell>{t("name")}</TableCell>
            <TableCell align="right">{t("confirmed")}</TableCell>
            <TableCell align="right">{t("deaths")}</TableCell>
            <TableCell align="right">{t("critical")}</TableCell>
            <TableCell align="right">{t("active")}</TableCell>
            <TableCell align="right">{t("tests")}</TableCell>
            <TableCell align="right">{t("recovered")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArr.map((row) => {
            return (
              <Row
                row={row}
                addWatchlistItem={addWatchlistItem}
                removeWatchlistItem={removeWatchlistItem}
                hideWatchList={hideWatchList}
                watchList={watchList}
                setWatchList={setWatchList}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(CollapsibleTable);
