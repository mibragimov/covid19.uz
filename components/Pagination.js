import React from "react";
import PropTypes from "prop-types";
import TablePagination from "@material-ui/core/TablePagination";
import { withTranslation } from "../i18n";

function Pagination({ setPage, setRowsPerPage, page, rowsPerPage, count, t }) {
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
      rowsPerPageOptions={[10, 15, 20, { value: -1, label: t("all") }]}
      labelRowsPerPage={t("rowsPerPage")}
    />
  );
}

Pagination.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Pagination);
