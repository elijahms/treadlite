import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

const TreadliterPage = ({ user }) => {
  // const [databaseScore, setDatabaseScore] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  let today = new Date();

  const [tlHabit, setTlHabit] = useState({
    less_transport: 2,
    less_meat: 2,
    turned_off_lights: 2,
    bought_less: 2,
  });

  // useEffect(() => {
  //   fetch(`/api/dashboard`).then((r) => {
  //     if (r.ok) {
  //       r.json().then((data) => {
  //         setDatabaseScore(data);
  //       });
  //     } else {
  //       r.json().then((err) => console.log(err));
  //     }
  //   });
  // }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const trend = () => {
    let trendnum =
      tlHabit.less_meat +
      tlHabit.less_transport +
      tlHabit.turned_off_lights +
      tlHabit.bought_less;
    if (trendnum > 8) {
      return "Going Up";
    } else if (trendnum === 8) {
      return "The Same";
    } else {
      return "Going Down";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tlHabit);
    const form = {
      trend_num:
        tlHabit.less_meat +
        tlHabit.less_transport +
        tlHabit.turned_off_lights +
        tlHabit.bought_less,
      trend_update: today,
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
        r.json().then((userrecord) => {
          console.log(userrecord);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
    setOpenSnackBar(true);
  };

  const tlarr = ["Not at All", "Less Often", "Same", "More", "Exclusively!"];
  const colorarr = ["#a2d4c4", "#86adae", "	#667f92", "#3e5369", "#162640"];

  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: "105vh" }}>
      {/* <Paper> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 8,
          ml: 2,
          mr: 2,
          p: 2,
        }}
      >
        <Typography sx={{ textAlign: "center", mb: 6 }} variant="h4">
          Move Your Trends – Treadliter!
        </Typography>

        <Typography id="non-linear-slider" gutterBottom>
          I took public transportation:{" "}
          <span
            style={{
              color: `${colorarr[tlHabit.less_transport]}`,
            }}
          >
            {tlarr[tlHabit.less_transport]}
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
              setTlHabit({
                ...tlHabit,
                less_transport: e.target.value,
              })
            }
          />
        </Stack>
        <Typography id="non-linear-slider" gutterBottom>
          I ate plant-based foods:{" "}
          <span
            style={{
              color: `${colorarr[tlHabit.less_meat]}`,
            }}
          >
            {tlarr[tlHabit.less_meat]}
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
              setTlHabit({
                ...tlHabit,
                less_meat: e.target.value,
              })
            }
          />
        </Stack>
        <Typography id="non-linear-slider" gutterBottom>
          I shopped sustainably:{" "}
          <span
            style={{
              color: `${colorarr[tlHabit.bought_less]}`,
            }}
          >
            {tlarr[tlHabit.bought_less]}
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
              setTlHabit({
                ...tlHabit,
                bought_less: e.target.value,
              })
            }
          />
        </Stack>
        <Typography id="non-linear-slider" gutterBottom>
          I turn off lights:{" "}
          <span
            style={{
              color: `${colorarr[tlHabit.turned_off_lights]}`,
            }}
          >
            {tlarr[tlHabit.turned_off_lights]}
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
            onChange={(e) =>
              setTlHabit({
                ...tlHabit,
                turned_off_lights: e.target.value,
              })
            }
          />
        </Stack>
        <Stack spacing={10} direction="row" sx={{ mb: 3 }} alignItems="center">
        <Typography id="non-linear-slider" gutterBottom>
          It looks like your trends are:{" "}
          <span style={{ color: "#a2d4c4" }}>{trend()}</span>
        </Typography>
        {/* <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "right",
          }}
        > */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!user ? true : false}
          >
            Submit
          </Button>
          </Stack>
        </Box>
      {/* </Box> */}
      {/* </Paper> */}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Score Updated"
      />
    </Container>
  );
};

export default TreadliterPage;
