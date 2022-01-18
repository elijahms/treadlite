import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Transportation = ({ setTabValue }) => {
  const [transportationHabit, setTransportationHabit] = useState({
    miles_per_gallon: 20,
    miles_per_week: 275,
    own_ev: false,
    own_car: true,
    public_transport: 2,
  });

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/userrecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transportationHabit),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userrecord) => {
          console.log(userrecord);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
    //setOpenSnackBar(true);
    setTabValue(1);
  };

  const mpgMarks = [
    {
      value: 24.2,
      label: "US Avg",
    },
    {
      value: 45,
      label: "45 MPG",
    },
  ];

  const mpwMarks = [
    {
      value: 275,
      label: "US Average",
    },
  ];

  const transportarr = ["Never", "Rarely", "Sometimes", "Often", "Always"];
  const colorarr = ["#a2d4c4", "#86adae", "	#667f92", "#3e5369", "#162640"];

  return (
    <Box
      sx={{
        height: "auto",
        pl: 2,
        pr: 2,
        mt: 3,
      }}
    >
      <Grid container spacing={0} sx={{ mb: 1, mt: 4 }}>
        <Grid item xs={6} sm={6} md={2} lg={2} >
          <Typography id="non-linear-slider" gutterBottom>
            I use a car
          </Typography>
          <Switch
            checked={transportationHabit.own_car}
            onChange={(e) =>
              setTransportationHabit({
                ...transportationHabit,
                own_car: !transportationHabit.own_car,
              })
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid >
        <Grid item xs={6} sm={6} md={2} lg={2}>
          <Typography id="non-linear-slider" gutterBottom>
            I drive an EV
          </Typography>
          <Switch
            checked={transportationHabit.own_ev}
            disabled={!transportationHabit.own_car ? true : false}
            onChange={(e) =>
              setTransportationHabit({
                ...transportationHabit,
                own_ev: !transportationHabit.own_ev,
              })
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} >
          <Typography id="non-linear-slider" gutterBottom>
            What is your Car's MPG?
          </Typography>
          <Slider
            aria-label="Custom marks"
            size="medium"
            defaultValue={20}
            step={1}
            min={15}
            max={60}
            disabled={
              transportationHabit.own_ev || !transportationHabit.own_car
                ? true
                : false
            }
            valueLabelDisplay="auto"
            marks={mpgMarks}
            onChange={(e) =>
              setTransportationHabit({
                ...transportationHabit,
                miles_per_gallon: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>

      <Typography id="non-linear-slider" gutterBottom>
        How Many Miles Do You Drive Per Week
      </Typography>
      <Slider
        sx={{ mb: 8 }}
        aria-label="miles in a week"
        size="medium"
        defaultValue={275}
        disabled={!transportationHabit.own_car ? true : false}
        step={1}
        valueLabelDisplay="auto"
        min={0}
        max={700}
        marks={mpwMarks}
        onChange={(e) =>
          setTransportationHabit({
            ...transportationHabit,
            miles_per_week: e.target.value,
          })
        }
      />
      <Typography id="non-linear-slider" gutterBottom>
        I take public transportation:{" "}
        <span
          style={{ color: `${colorarr[transportationHabit.public_transport]}` }}
        >
          {transportarr[transportationHabit.public_transport]}
        </span>
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={2}
          step={1}
          min={0}
          max={4}
          // valueLabelDisplay="auto"
          onChange={(e) =>
            setTransportationHabit({
              ...transportationHabit,
              public_transport: e.target.value,
            })
          }
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Next (1/4)
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
