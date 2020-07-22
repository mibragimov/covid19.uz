import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withTranslation } from "../i18n";
import uid from "uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Row from "./Row";

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

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
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
          {data.map((row) => {
            const id = uid();

            return (
              <Row
                key={id}
                row={row}
                addWatchlistItem={addWatchlistItem}
                removeWatchlistItem={removeWatchlistItem}
                hideWatchList={hideWatchList}
                id={id}
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
