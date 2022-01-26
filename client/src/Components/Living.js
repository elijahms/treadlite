import { useState, useEffect } from "react";
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
    household_size: 2,
    zip_code: "00001",
    elec_cost: 1,
    gas_cost: 1,
    oil_cost: 1,
    primary_heating: "elec",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [elec, setElec] = useState(false);
  const [gas, setGas] = useState(false);
  const [oil, setOil] = useState(false);
  const [err, setErr] = useState("");
  //const [snackMsg, setSnackMsg] = useState("");

  useEffect(() => {
    fetch("/api/userrecord").then((r) => {
      if (r.ok) {
        r.json().then((userrecord) => {
          setLivingHabit({
            household_size: userrecord.household_size,
            elec_cost: 1,
            gas_cost: 1,
            oil_cost: 1,
            primary_heating: userrecord.primary_heating,
          });
        });
      } else {
        r.json().then((err) => {
          setErr(err.errors);
        });
      }
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/living", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livingHabit),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          console.log("Updated");
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
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
      <Typography id="house-size-label" gutterBottom>
        Household size:{" "}
        <span style={{ color: "#86adae" }}>
          {livingarr[livingHabit.household_size]}
        </span>
      </Typography>
      <Stack spacing={4} direction="row" sx={{ mb: 3 }} alignItems="center">
        <Slider
          aria-label="Household Size"
          size="medium"
          value={livingHabit.household_size}
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
          id="zipcode-input"
          label="zipcode"
          // value={livingHabit.zip_code}
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              zip_code: e.target.value,
            })
          }
        />
      </Stack>

      <Typography id="primary-heating-text" gutterBottom>
        My living space is heated{" "}
        <span style={{ textDecoration: "underline" }}>primarily</span> with:
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
        <ButtonGroup fullWidth>
          <Button
            onClick={() => setElec(() => !elec)}
            variant={elec ? "contained" : "outlined"}
            disabled={gas || oil ? true : false}
          >
            Elec
          </Button>
          <Button
            onClick={() => setGas(() => !gas)}
            variant={gas ? "contained" : "outlined"}
            disabled={elec || oil ? true : false}
          >
            Gas
          </Button>
          <Button
            onClick={() => setOil(() => !oil)}
            variant={oil ? "contained" : "outlined"}
            disabled={elec || gas ? true : false}
          >
            Oil
          </Button>
        </ButtonGroup>
      </Stack>
      <Typography id="average-bill-text" gutterBottom>
        My average monthly bill:
      </Typography>
      <Stack spacing={6} direction="row" sx={{ mb: 3 }} alignItems="center">
        <TextField
          disabled={elec ? false : true}
          id="elec-input"
          label="$$/month"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              elec_cost: parseInt(e.target.value),
              primary_heating: "elec",
            })
          }
        />
        <TextField
          disabled={gas ? false : true}
          id="gas-input"
          label="$$/month"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              gas_cost: parseInt(e.target.value),
              primary_heating: "gas",
            })
          }
        />
        <TextField
          disabled={oil ? false : true}
          id="oil-input"
          label="$$/month"
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              oil_cost: parseInt(e.target.value),
              primary_heating: "oil",
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
