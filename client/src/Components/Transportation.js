import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const Transportation = () => {
  const [MPG, setMPG] = useState(20);
  const [milesDriven, setMilesDriven] = useState(70);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      miles_per_gallon: MPG,
      miles_per_week: milesDriven,
    };
    console.log(form);

    fetch("/api/userrecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userdatum) => {
          console.log(userdatum);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
    setOpenSnackBar(true);
  };

  const mpgMarks = [
    {
      value: 24.2,
      label: "US Average",
    },
    {
      value: 80,
      label: "80 MPG",
    },
  ];

  const mpwMarks = [
    {
      value: 275,
      label: "US Average",
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <h3> What is your Car's Average Fuel Economy?</h3>
      <Slider
        aria-label="Custom marks"
        size="medium"
        defaultValue={20}
        step={1}
        min={15}
        max={100}
        valueLabelDisplay="auto"
        marks={mpgMarks}
        onChange={(e) => setMPG(e.target.value)}
      />
      <h3>How Many Miles Do You Drive Per Week</h3>
      <Slider
        aria-label="Custom marks"
        size="medium"
        defaultValue={275}
        step={1}
        valueLabelDisplay="auto"
        min={0}
        max={700}
        marks={mpwMarks}
        onChange={(e) => setMilesDriven(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Score Updated"
      />
    </Box>
  );
};

export default Transportation;

// Pounds of CO2 emitted per gallon 	18.74/gallon	lbs CO2/gallon -- https://www.eia.gov/environment/emissions/co2_vol_mass.php
// Ratio of emissions of greenhouse gases other than CO2 	1.01	lbCO2e/lbCO2
// Passenger Vehicle Fuel Economy	21.6	miles per gallon (mpg)
// Average miles traveled per year per vehicle	https://www.fhwa.dot.gov/ohim/onh00/bar8.htm	miles per year 13,476
// Average emissions for a typical vehicle	 10,484 	lbs CO2e/vehicle
// (1/21.6 mpg)*11,398 miles/year*19.6 lbs CO2/gallon*CO2e / CO2
