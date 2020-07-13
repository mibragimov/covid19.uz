import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#e91e63",
    },
    warning: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    info: {
      main: "#00acc1",
    },
    grey: {
      "900": "#999",
    },
  },
});

export default theme;
