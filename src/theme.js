import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#131b28",
      light: "#1B2435",
      A700: "#222c45",
      contrastText: "#fff",
    },
    secondary: {
      main: "#7CA6C2",
    },
    warning: {
      main: "#CF9925",
      dark: "#ffeb00",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#ff3860",
    },
    info: {
      main: "#0ee9cb",
    },
    grey: {
      "900": "#999",
    },
    text: {
      primary: "#d8dce6",
    },
  },
  overrides: {
    MuiMenu: {
      list: {
        backgroundColor: "#1B2435",
      },
    },
    MuiSelect: {
      icon: {
        color: "#fff",
      },
    },
  },
});

export default theme;
