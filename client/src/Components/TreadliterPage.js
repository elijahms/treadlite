import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
//import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";

const TreadliterPage = ({ user }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("Success");
  const [colorarr, setColorArr] = useState([
    "#a2d4c4",
    "#86adae",
    "	#667f92",
    "#3e5369",
    "#162640",
  ]);
  let today = new Date();

  const [tlHabit, setTlHabit] = useState({
    less_transport: 2,
    less_meat: 2,
    turned_off_lights: 2,
    bought_less: 2,
  });

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
      return " Going Up";
    } else if (trendnum === 8) {
      return " The Same";
    } else {
      return " Going Down";
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
    fetch("/api/trendupdate", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userrecord) => {
          setSnackMessage("Success");
        });
      } else {
        r.json().then((err) => {
          setSnackMessage(err.errors);
        });
      }
    });
    setOpenSnackBar(true);
  };

  const tlarr = [
    "Not at All",
    "Less Often",
    "Same",
    "More Often",
    "Exclusively!",
  ];

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // useEffect(() => {
  //   if (prefersDarkMode) {
  //     setColorArr(["#7B726A", "#92887C", "#BDB5AA", "#7B8235", "#0D280E"]);
  //   } else {
  //     setColorArr(["#a2d4c4", "#86adae", "	#667f92", "#3e5369", "#162640"]);
  //   }
  // }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: "105vh" }}>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 8,
            ml: 0,
            mr: 0,
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
              onChange={(e) =>
                setTlHabit({
                  ...tlHabit,
                  bought_less: e.target.value,
                })
              }
            />
          </Stack>
          <Typography id="non-linear-slider" gutterBottom>
            I turned off lights:{" "}
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
          <Grid spacing={2} container>
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <Typography id="non-linear-slider" gutterBottom>
                It looks like your trends are:{" "}
                <span style={{ color: "#a2d4c4" }}>{trend()}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                disabled={!user ? true : false}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackMessage}
      />
    </Container>
  );
};

export default TreadliterPage;
