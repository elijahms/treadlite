import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import SpaIcon from "@mui/icons-material/Spa";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

const Food = () => {
  const [foodHabit, setFoodHabit] = useState(3);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [err, setErr] = useState("");
  const [snackMsg, setSnackMsg] = useState("");
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    const form = {
      food_habit: foodHabit,
    };

    fetch("/api/food", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          history.push("/dashboard");
        });
      } else {
        r.json().then((err) => {
          error = true;
          setErr(err.errors);
        });
      }
    });
    if (error) {
      setSnackMsg([...err]);
    }
    setOpenSnackBar(true);
  };

  const foodarr = [
    "Vegan",
    "Vegetarian",
    "Flexitarian",
    "Meat (1-2) /week",
    "Meat (3+) /week",
  ];
  const colorarr = ["#a2d4c4", "#86adae", "	#667f92", "#3e5369", "#3e5369"];

  useEffect(() => {
    fetch("/api/userrecord").then((r) => {
      if (r.ok) {
        r.json().then((userrecord) => {
          setFoodHabit(userrecord.food_habit);
        });
      } else {
        r.json().then((err) => {
          console.log("error");
        });
      }
    });
  }, []);

  return (
    <Box
      sx={{
        height: "auto",
        pl: 2,
        pr: 2,
        mt: 3,
      }}
    >
      <Typography id="eating-habits" gutterBottom>
        My eating habits:{" "}
        <span style={{ color: `${colorarr[foodHabit]}` }}>
          {foodarr[foodHabit]}
        </span>
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <SpaIcon />
        <Slider
          aria-label="Custom marks"
          size="medium"
          value={foodHabit}
          step={1}
          min={0}
          max={4}
          onChange={(e) => setFoodHabit(e.target.value)}
        />
        <FastfoodIcon />
      </Stack>
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

export default Food;
