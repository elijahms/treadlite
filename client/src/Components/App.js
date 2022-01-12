import MainPage from "./MainPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";


const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      type: "light",
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "rgba(0,245,109,0.79)",
      },
      secondary: {
        main: "#0090f5",
      },
      background: {
        default: "#eee2dc",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
