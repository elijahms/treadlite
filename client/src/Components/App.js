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
import DashboardPage from "./DashboardPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          // console.log(user);
          setUser(user);
        });
      } else {
        r.json().then(() => {
          console.log("Not Signed In");
        });
      }
    });
  }, []);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      type: "light",
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#098a5a",
      },
      secondary: {
        main: "#7558cc",
      },
      background: {
        default: "#f7f5ee",
      },
    },
    typography: {
      fontFamily: "Raleway, Arial",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NewMain user={user} setUser={setUser} />
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
    </ThemeProvider>
  );
};

export default App;
