import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper } from "@mui/material";
import Transportation from "./Transportation";

// import Home from "./Home";
// import Food from "./Food";
// import Shopping from "./Shopping";

const AccountPage = ({ user, setUser }) => {
  const handleLogout = (event) => {
    fetch("/api/logout", { method: "DELETE" }).then((data) =>
      console.log(data)
    );
    setUser(null);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleTabsView() {
    if (value === 0) {
      return <Transportation />;
    } else {
      return <h1>Sorry...Working on this</h1>;
    }
  }

  return (
    <Container maxWidth="md">
      <Paper>
        <Box sx={{ marginTop: "7%", minHeight: "90vh" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="input example"
            >
              <Tab label="Getting Around" />
              <Tab label="Living" />
              <Tab label="Shopping" />
              <Tab label="Eating" />
            </Tabs>
          </Box>
          {handleTabsView()}
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
