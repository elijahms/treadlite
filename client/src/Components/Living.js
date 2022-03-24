import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";
import SimpleDialog from "./SimpleDialog";

const Living = ({ setTabValue }) => {
  const [livingHabit, setLivingHabit] = useState({
    household_size: 2,
    zip_code: "00001",
    monthly_bill: 1,
    primary_heating: "elec",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [notKnown, setNotKnown] = useState(false);
  // const [err, setErr] = useState("");
  // const [primaryHeating, setPrimaryHeating] = useState("elec");
  const [notKnownValue, setNotKnownValue] = useState(1);
  //const [snackMsg, setSnackMsg] = useState("");

  useEffect(() => {
    fetch("/api/userrecord").then((r) => {
      if (r.ok) {
        r.json().then((userrecord) => {
          setLivingHabit({
            household_size: userrecord.household_size,
            monthly_bill: 1,
            primary_heating: userrecord.primary_heating,
          });
        });
      } else {
        r.json().then((err) => {
          // setErr(err.errors);
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
        r.json().then((r) => {
          console.log("Updated");
        });
      } else {
        // r.json().then((err) => setErr(err.errors));
      }
    });
    setTabValue(2);
  };

  function notKnownFunc(e) {
    setNotKnownValue(e.target.value);
    setLivingHabit({
      ...livingHabit,
      primary_heating: "unknown",
      monthly_bill: e.target.value,
    });
  }

  const livingarr = ["One", "Two", "Three", "Four", "Five"];
  const notknownarr = [
    "  I barely use anything",
    "  I'm an average person",
    "  I leave the lights on ALWAYS.",
  ];

  return (
    <Box
      sx={{
        height: "auto",
        pl: 2,
        pr: 2,
        mt: 1,
      }}
    >
      <SimpleDialog
        dialogTitle={"More Info:"}
        dialogContent={
          "This section calculates your CO2 (Carbon Dioxide) impact based on your primary utility bill."
        }
      />
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
          variant="outlined"
          onChange={(e) =>
            setLivingHabit({
              ...livingHabit,
              zip_code: e.target.value,
            })
          }
        />
      </Stack>
      <Typography sx={{ mt: 3 }} id="primary-heating-text" gutterBottom>
        I have no clue what my utility bills are!{" "}
      </Typography>
      <Switch
        sx={{ mb: 1 }}
        checked={notKnown}
        onChange={() => setNotKnown(() => !notKnown)}
      />
      {!notKnown ? (
        <Box>
          <Typography id="primary-heating-text" gutterBottom>
            My living space is heated{" "}
            <span style={{ textDecoration: "underline" }}>primarily</span> with:
          </Typography>
          <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
            <ButtonGroup fullWidth>
              <Button
                onClick={() =>
                  setLivingHabit({
                    ...livingHabit,
                    primary_heating: "elec",
                  })
                }
                variant={
                  livingHabit.primary_heating === "elec"
                    ? "contained"
                    : "outlined"
                }
              >
                Elec
              </Button>
              <Button
                onClick={() =>
                  setLivingHabit({
                    ...livingHabit,
                    primary_heating: "gas",
                  })
                }
                variant={
                  livingHabit.primary_heating === "gas"
                    ? "contained"
                    : "outlined"
                }
              >
                Gas
              </Button>
              <Button
                onClick={() =>
                  setLivingHabit({
                    ...livingHabit,
                    primary_heating: "oil",
                  })
                }
                variant={
                  livingHabit.primary_heating === "oil"
                    ? "contained"
                    : "outlined"
                }
              >
                Oil
              </Button>
            </ButtonGroup>
          </Stack>
          <Typography id="average-bill-text" gutterBottom>
            My average monthly bill:
          </Typography>
          <TextField
            id="bill-input"
            label="$$/month"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setLivingHabit({
                ...livingHabit,
                monthly_bill: parseInt(e.target.value),
              })
            }
          />
        </Box>
      ) : (
        <Box>
          <Typography id="guess-slider-label" gutterBottom>
            My best guess is:
            <span style={{ color: "#86adae" }}>
              {notknownarr[notKnownValue]}
            </span>
          </Typography>
          <Slider
            aria-label="Do not Know"
            size="medium"
            value={notKnownValue}
            step={1}
            min={0}
            max={2}
            onChange={notKnownFunc}
          />
        </Box>
      )}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Next (2/4)
        </Button>
      </Stack>
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
