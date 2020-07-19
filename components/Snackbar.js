import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function SimpleSnackbar({ open, setOpen, transition }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      TransitionComponent={transition}
      key={transition ? transition.name : ""}
    >
      <MuiAlert elevation={6} variant="filled">
        Copied!
      </MuiAlert>
    </Snackbar>
  );
}
