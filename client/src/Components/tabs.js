import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Transportation from './Transportation';
// import Home from "./Home";
// import Food from "./Food";
// import Shopping from "./Shopping";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Transportation" {...a11yProps(0)} />
          <Tab label="Home" {...a11yProps(1)} />
          <Tab label="Shopping" {...a11yProps(2)} />
          <Tab label="Food" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Transportation/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          ...Working on this feature! 
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          ...Working on this feature! 
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          ...Working on this feature! 
        </TabPanel>
    </Box>
  );
}
