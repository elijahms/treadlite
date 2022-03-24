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
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpPage from "./SignupPage";
import DashboardPage from "./DashboardPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
      } else {
        r.json().then(() => {
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
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/treadliter" element={<TreadliterPage user={user} />} />
        <Route path="/friends" element={<Friends user={user} />} />
        <Route
          path="/account"
          element={
            !user ? (
              <SignUpPage setUser={setUser} />
            ) : (
              <AccountPage setUser={setUser} user={user} />
            )
          }
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
