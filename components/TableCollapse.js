import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function CollapsibleTable({
  data,
  addWatchlistItem,
  removeWatchlistItem,
  hideWatchList,
  watchList,
  setWatchList,
}) {
  const classes = useTableStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Confirmed</TableCell>
            <TableCell align="right">Deceased</TableCell>
            <TableCell align="right">Critical</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Tests</TableCell>
            <TableCell align="right">Recovered</TableCell>
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
