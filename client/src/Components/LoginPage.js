import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const history = useHistory();

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {/* {"Copyright © "} */}
        <Link
          className="login-link"
          color="inherit"
          href="https://elijahsilverman.com/"
        >
          Elijah Silverman -
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const form = {
      email: data.get("email"),
      password: data.get("password"),
    };
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          history.push("/account");
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper>
        <Box
          sx={{
            mt: 8,
            pl: 5,
            pr: 5,
            pb: 2,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  className="login-link"
                  exact
                  to="/signup"
                  variant="body2"
                >
                  Dont have an account? Sign Up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Copyright />
    </Container>
  );
};

export default LoginPage;
