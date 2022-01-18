import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";

const Living = ({ setTabValue }) => {
  const [livingHabit, setLivingHabit] = useState({
    household_size: 1,
    zip_code: "00001",
    elec_cost: 0,
    water_cost: 0,
    gas_cost: 0,
    oil_cost: 0,
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [elec, setElec] = useState(false);
  const [water, setWater] = useState(false);
  const [gas, setGas] = useState(false);
  const [oil, setOil] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(livingHabit);
    //const form = [...livingHabit]

    fetch("/api/userrecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livingHabit),
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
    setTabValue(2);
  };

  const livingarr = ["One", "Two", "Three", "Four", "Five"];

  return (
    <Box
      sx={{
        height: "auto",
        paddingLeft: "5%",
        paddingRight: "5%",
        mt: 3,
      }}
    >
      <Typography id="non-linear-slider" gutterBottom>
        Household Size:{" "}
        <span style={{ color: "#86adae" }}>
          {livingarr[livingHabit.household_size]}
        </span>
      </Typography>
      <Stack spacing={4} direction="row" sx={{ mb: 3 }} alignItems="center">
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={2}
          step={1}
          min={0}
          max={4}
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              household_size: e.target.value,
            })
          }
        />
        <TextField
          id="outlined-basic"
          label="Zipcode"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              zip_code: e.target.value,
            })
          }
        />
      </Stack>

      <Typography id="non-linear-slider" gutterBottom>
        WHat do you pay for every month?:
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
        <ButtonGroup fullWidth>
          <Button
            onClick={() => setElec(() => !elec)}
            variant={elec ? "contained" : "outlined"}
          >
            Elec
          </Button>
          <Button
            onClick={() => setWater(() => !water)}
            variant={water ? "contained" : "outlined"}
          >
            Water
          </Button>
          <Button
            onClick={() => setGas(() => !gas)}
            variant={gas ? "contained" : "outlined"}
          >
            Gas
          </Button>
          <Button
            onClick={() => setOil(() => !oil)}
            variant={oil ? "contained" : "outlined"}
          >
            Oil
          </Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
        <TextField
          disabled={elec ? false : true}
          id="outlined-basic"
          label="Elec"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              elec_cost: parseInt(e.target.value),
            })
          }
        />
        <TextField
          disabled={water ? false : true}
          id="outlined-basic"
          label="Water"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              water_cost: parseInt(e.target.value),
            })
          }
        />
        <TextField
          disabled={gas ? false : true}
          id="outlined-basic"
          label="Gas"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              gas_cost: parseInt(e.target.value),
            })
          }
        />
        <TextField
          disabled={oil ? false : true}
          id="outlined-basic"
          label="Oil"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              oil_cost: parseInt(e.target.value),
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
        Next (2/4)
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

export default Living;

//https://api.eia.gov/series/?api_key=8To42WkSnf9HLZxGPuUPGNyH0sJYZZxbCDeJgPP8&series_id=ELEC.PRICE.NY-RES.A

//8To42WkSnf9HLZxGPuUPGNyH0sJYZZxbCDeJgPP8
