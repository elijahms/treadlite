import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ComputerIcon from "@mui/icons-material/Computer";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";

const Shopping = ({setTabValue}) => {
  const [shoppingHabit, setShoppingHabit] = useState({
    total_shop_freq: 2,
    shop_time_freq: 52,
    online_shop_freq: 1,
    return_shop_freq: 3,
    new_shop_freq: 2,
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
    console.log(shoppingHabit);
    //const form = [...shoppingHabit];

    fetch("/api/userrecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shoppingHabit),
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
    setTabValue(3)
  };

  const shoppingarr = ["Never", "Rarely", "Sometimes", "Often", "Always"];
  const shopping_freq_arr = ["Once", "Twice", "xThree", "xFour", "xFive"];
  const colorarr = ["#a2d4c4", "#86adae", "	#667f92", "#3e5369", "#162640"];

  return (
    <Box
      sx={{
        height: "auto",
        pl: 2,
        pr: 2,
        // minHeight: "65vh",
        mt: 3,
      }}
    >
      <Typography id="non-linear-slider" gutterBottom>
        I shop for clothing:{" "}
        <span style={{ color: `${colorarr[shoppingHabit.total_shop_freq]}` }}>
          {shopping_freq_arr[shoppingHabit.total_shop_freq]}
        </span>
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
          // valueLabelDisplay="auto"
          onChange={(e) =>
            setShoppingHabit({
              ...shoppingHabit,
              total_shop_freq: e.target.value,
            })
          }
        />
        <ShoppingBagIcon />
      </Stack>
      <FormControl sx={{ ml: 4.5 }} component="fieldset">
        <RadioGroup row aria-label="freq" defaultValue='week' name="row-radio-buttons-group">
          <FormControlLabel
            onClick={(e) =>
              setShoppingHabit({
                ...shoppingHabit,
                shop_time_freq: 52,
              })
            }
            value="week"
            control={<Radio />}
            label="Week"
          />
          <FormControlLabel
            onClick={(e) =>
              setShoppingHabit({
                ...shoppingHabit,
                shop_time_freq: 12,
              })
            }
            value="month"
            control={<Radio />}
            label="Month"
          />
          <FormControlLabel
            onClick={(e) =>
              setShoppingHabit({
                ...shoppingHabit,
                shop_time_freq: 1,
              })
            }
            value="year"
            control={<Radio />}
            label="Year"
          />
        </RadioGroup>
      </FormControl>
      <Divider sx={{ mb: 4, ml: 4 }} />
      <Typography id="non-linear-slider" gutterBottom>
        I buy in-store:{" "}
        <span style={{ color: `${colorarr[shoppingHabit.online_shop_freq]}` }}>
          {shoppingarr[shoppingHabit.online_shop_freq]}
        </span>
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
        <ComputerIcon />
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={1}
          step={1}
          min={0}
          max={4}
          // valueLabelDisplay="auto"
          onChange={(e) =>
            setShoppingHabit({
              ...shoppingHabit,
              online_shop_freq: e.target.value,
            })
          }
        />
        <StoreMallDirectoryIcon />
      </Stack>
      <Typography id="non-linear-slider" gutterBottom>
        I return:{" "}
        <span style={{ color: `${colorarr[shoppingHabit.return_shop_freq]}` }}>
          {shoppingarr[shoppingHabit.return_shop_freq]}
        </span>
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
        <SentimentSatisfiedAltIcon />
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={3}
          step={1}
          min={0}
          max={4}
          // valueLabelDisplay="auto"
          onChange={(e) =>
            setShoppingHabit({
              ...shoppingHabit,
              return_shop_freq: e.target.value,
            })
          }
        />
        <ArrowBackIosIcon />
      </Stack>
      <Typography id="non-linear-slider" gutterBottom>
        I buy new:{" "}
        <span style={{ color: `${colorarr[shoppingHabit.new_shop_freq]}` }}>
          {shoppingarr[shoppingHabit.new_shop_freq]}
        </span>
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="center">
        <ShoppingBasketRoundedIcon />
        <Slider
          aria-label="Custom marks"
          size="medium"
          defaultValue={2}
          step={1}
          min={0}
          max={4}
          // valueLabelDisplay="auto"
          onChange={(e) =>
            setShoppingHabit({
              ...shoppingHabit,
              new_shop_freq: e.target.value,
            })
          }
        />
        <FiberNewIcon />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
         Next (3/4)
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
