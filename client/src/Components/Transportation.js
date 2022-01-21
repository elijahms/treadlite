import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const transportarr = ["Never", "Rarely", "Sometimes", "Often", "Always"];
const colorarr = ["#a2d4c4", "#86adae", "	#667f92", "#3e5369", "#162640"];

const Transportation = ({ setTabValue }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [err, setErr] = useState("");
  const [snackMsg, setSnackMsg] = useState("");
  const [transportationHabit, setTransportationHabit] = useState({
    miles_per_gallon: 20,
    miles_per_week: 275,
    own_ev: false,
    own_car: true,
    public_transport: 2,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  useEffect(() => {
    fetch("/api/userrecord").then((r) => {
      if (r.ok) {
        r.json().then((userrecord) => {
          setTransportationHabit({
            miles_per_gallon: userrecord.miles_per_gallon,
            miles_per_week: userrecord.miles_per_week,
            own_ev: userrecord.own_ev,
            own_car: userrecord.own_car,
            public_transport: userrecord.public_transport,
          });
        });
      } else {
        r.json().then((err) => {
          console.log("error");
        });
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    fetch("/api/transport", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transportationHabit),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userrecord) => {});
      } else {
        r.json().then((err) => {
          error = true;
          setErr(err.error);
        });
      }
    });
    if (error) {
      setSnackMsg([...err]);
    } else {
      setTabValue(1);
    }
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
        <Grid item xs={6} sm={6} md={2} lg={2}>
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
        </Grid>
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
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Typography id="non-linear-slider" gutterBottom>
            My car's MPG is:
          </Typography>
          <Slider
            aria-label="Custom marks"
            size="medium"
            // defaultValue={20}
            value={transportationHabit.miles_per_gallon}
            step={1}
            min={15}
            max={55}
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
        I drive this many miles per week:
      </Typography>
      <Slider
        sx={{ mb: 8 }}
        aria-label="miles in a week"
        size="medium"
        // defaultValue={275}
        value={transportationHabit.miles_per_week}
        disabled={!transportationHabit.own_car ? true : false}
        step={1}
        valueLabelDisplay="auto"
        min={20}
        max={450}
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
          value={transportationHabit.public_transport}
          step={1}
          min={0}
          max={4}
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
