import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ComputerIcon from '@mui/icons-material/Computer';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

const Shopping = () => {
  const [foodHabit, setFoodHabit] = useState(2);
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
      food_habits: foodHabit,
    };

    // fetch("/api/userrecords", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // }).then((r) => {
    //   if (r.ok) {
    //     r.json().then((userrecord) => {
    //       console.log(userrecord);
    //     });
    //   } else {
    //     r.json().then((err) => console.log(err));
    //   }
    // });
    setOpenSnackBar(true);
  };

  const marks = [
    {
      value: 1,
      label: "Vegetarian",
    },
    {
      value: 2,
      label: "Flexitarian",
    },
    {
      value: 3,
      label: "Meat-Eater (1-2) per week",
    },
  ];

  return (
    <Box
      sx={{
        height: "60vh",
        paddingLeft: "5%",
        paddingRight: "5%",
        minHeight: '65vh',
        mt: 3,
      }}
    >
      <Typography id="non-linear-slider" gutterBottom>
        I shop for clothing:
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <UnfoldLessIcon />
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={2}
          step={1}
          min={0}
          max={4}
          valueLabelDisplay="auto"
          // marks={marks}
          onChange={(e) => setFoodHabit(e.target.value)}
        />
        <ShoppingBagIcon />
      </Stack>
      <Typography id="non-linear-slider" gutterBottom>
        I buy online:
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <ComputerIcon />
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={2}
          step={1}
          min={0}
          max={4}
          valueLabelDisplay="auto"
          // marks={marks}
          onChange={(e) => setFoodHabit(e.target.value)}
        />
        <StoreMallDirectoryIcon />
      </Stack>
      <Typography id="non-linear-slider" gutterBottom>
        I return:
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <SentimentSatisfiedAltIcon />
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={2}
          step={1}
          min={0}
          max={4}
          valueLabelDisplay="auto"
          // marks={marks}
          onChange={(e) => setFoodHabit(e.target.value)}
        />
        <ArrowBackIosIcon />
      </Stack>
      <Typography id="non-linear-slider" gutterBottom>
        I buy second-hand:
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        {/* <SpaIcon /> */}
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={2}
          step={1}
          min={0}
          max={4}
          valueLabelDisplay="auto"
          // marks={marks}
          onChange={(e) => setFoodHabit(e.target.value)}
        />
        {/* <FastfoodIcon /> */}
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

export default Shopping;
