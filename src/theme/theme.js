import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: "#ffffff", // Set contrast text color for primary
    },
    secondary: {
      main: red[500],
      contrastText: "#ffffff", // Set contrast text color for secondary
    },
  },
});

export default theme;
