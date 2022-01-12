import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import { Paper } from "@mui/material";
import FullWidthTabs from "./tabs";

const AccountPage = ({ user, setUser }) => {
  const handleLogout = (event) => {
    fetch("/api/logout", { method: "DELETE" }).then((data) =>
      console.log(data)
    );
    setUser(null);
  };

  return (
    <Container maxWidth="md">
        <Paper>
      <Box
        sx={{
          marginTop: "7%",
        //   borderRadius: "20"
        }}
      >
        <FullWidthTabs />
      </Box>
      </Paper>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={user}
              onChange={handleLogout}
              aria-label="login switch"
            />
          }
          label={user ? "Logout" : "Login"}
        />
      </FormGroup>
    </Container>
  );
};

export default AccountPage;
