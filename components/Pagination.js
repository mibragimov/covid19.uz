import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

export default function Pagination({
  setPage,
  setRowsPerPage,
  page,
  rowsPerPage,
  count,
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPageOptions={[10, 20, { value: -1, label: "All" }]}
    />
  );
}
