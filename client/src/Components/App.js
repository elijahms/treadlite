import NewMain from "./NewMain";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./LoginPage";
import AccountPage from "./AccountPage";
import Friends from "./Friends";
import TreadliterPage from "./TreadliterPage";
import AboutPage from "./AboutPage";
import HomePage from "./HomePage";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpPage from "./SignupPage";
import Container from "@mui/material/Container";
import DashboardPage from "./DashboardPage";
import RalewayReg from '../Fonts/Raleway-Medium.ttf';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
          setUser(user);
        });
      } else {
        r.json().then(console.log("no user"));
      }
    });
  }, []);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // const theme = createTheme({
  //   palette: {
  //     type: "light",
  //     mode: prefersDarkMode ? "dark" : "light",
  //     primary: {
  //       main: "rgba(0,245,109,0.79)",
  //     },
  //     secondary: {
  //       main: "#0090f5",
  //     },
  //     background: {
  //       default: "#eee2dc",
  //     },
  //   },
  // });

  const theme = createTheme({
    palette: {
      type: "light",
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "rgba(9,138,90,0.79)",
      },
      secondary: {
        main: "#e040fb",
      },
      background: {
        default: "#756d6c",
      },
    },
    typography: {
      fontFamily: 'Raleway, Arial',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Raleway';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Raleway'), local('Raleway-Regular'), url(${RalewayReg}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NewMain user={user} setUser={setUser} />
      <Container
        sx={{
          mt: 14,
        }}
        maxWidth="false"
      >
        <Switch>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/treadliter">
            <TreadliterPage user={user} />
          </Route>
          <Route exact path="/friends">
            <Friends user={user} />
          </Route>
          <Route exact path="/account">
            {!user ? (
              <SignUpPage setUser={setUser} />
            ) : (
              <AccountPage setUser={setUser} user={user} />
            )}
          </Route>
          <Route exact path="/login">
            <LoginPage setUser={setUser} />
          </Route>
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/signup">
            <SignUpPage setUser={setUser} />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
