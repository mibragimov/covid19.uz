import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#131b28",
      light: "#1B2435",
      contrastText: "#fff",
    },
    secondary: {
      main: "#7CA6C2",
    },
    warning: {
      main: "#CF9925",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    info: {
      main: "#0ee9cb",
    },
    grey: {
      "900": "#999",
    },
    text: {
      primary: "#fff",
    },
  },
});

export default theme;
