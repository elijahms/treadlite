import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Transportation from "./Transportation";
import Living from "./Living";
import Food from "./Food";
import Shopping from "./Shopping";

const AccountPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  function handleTabsView() {
    if (tabValue === 0) {
      return <Transportation />;
    } else if (tabValue === 1) {
      return <Living />;
    } else if (tabValue === 2) {
      return <Shopping />;
    } else {
      return <Food />;
    }
  }

  return (
    <Container maxWidth="md">
      <Paper>
        <Box sx={{ mt: 7, pb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              variant="scrollable"
              indicatorColor="secondary"
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
    </Container>
  );
};

export default AccountPage;
