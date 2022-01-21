import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { useState } from 'react'

const SignUpPage = ({ setUser }) => {
  const history = useHistory();
  const [err, setErr] = useState('')

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

  const emailHelper = () => {
    if (err.includes("Email can't be blank")) {
      return "Email can't be blank"
    } else if (err.includes("Email has already been taken")) {
      return "Email has already been taken"
    } else {
      return null
    }
  }

  const passwordHelper = () => {
    if (err.includes("Password confirmation doesn't match Password")) {
      return "Passwords do not match"
    } else if (err.includes("Password confirmation can't be blank")) {
      return "Password confirmation can't be blank"
    } else {
      return null
    }
  }

  const usernameHelper = () => {
    if (err.includes("Username can't be blank")) {
      return "Username can't be blank"
    } else if (err.includes("Username has already been taken")) {
      return "Username has already been taken"
    } else {
      return null
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const form = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("confirm-password"),
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
    };
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setErr('')
          history.push("/account");
        });
      } else {
        r.json().then((err) => {
          setErr(err.errors)
          console.log(err.errors)
        });
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onFocus={() => setErr('')}
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={err.includes("First name can't be blank") ? true : false}
                  helperText={err.includes("First name can't be blank") && "First name can't be blank"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={err.includes("Last name can't be blank") ? true : false}
                  helperText={err.includes("Last name can't be blank") && "Last name can't be blank"}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  error={err.includes("Username can't be blank") || err.includes("Username has already been taken")  ? true : false}
                  helperText={usernameHelper()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={err.includes("Email can't be blank") || err.includes("Email has already been taken")  ? true : false}
                  helperText={emailHelper()}
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
                  error={err.includes("Password can't be blank") ? true : false}
                  helperText={err.includes("Password can't be blank") && "Password can't be blank"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                  error={err.includes("Password confirmation doesn't match Password") || err.includes("Password confirmation can't be blank")  ? true : false}
                  helperText={passwordHelper()}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  className="login-link"
                  exact
                  to="/login"
                  variant="body2"
                >
                  Already have an account? Sign in
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

export default SignUpPage;
