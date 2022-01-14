import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";

const TreadliterPage = ({ user }) => {
  useEffect(() => {
    fetch(`/api/dashboard`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          setDatabaseScore(data);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const [databaseScore, setDatabaseScore] = useState(0);
  const [busTaken, setBusTaken] = useState(0);
  const [bikeTaken, setBikeTaken] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      score: databaseScore.score + (busTaken + bikeTaken * 2),
      id: databaseScore.id,
    };
    console.log(form);
    fetch("/api/treadliter", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userdatum) => {
          console.log(userdatum);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
    setOpenSnackBar(true);
  };

  const loweredScore = () => {
    return busTaken + bikeTaken * 2;
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper>
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // height: "50vh",
            m: 3,
          }}
        >
          <Typography
            sx={{
              mt: 3,
              // border: "2px solid red",
              textAlign: "center",
              // fontFamily: "Raleway",
            }}
            variant="h4"
          >
            Up Your Score! ....What did you do this week?
          </Typography>

          <Grid
            container
            spacing={0}
            sx={{
              // border: "2px solid blue",
              mt: 2,
            }}
          >
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ alignText: "left" }} variant="p">
                Took the bus instead of driving to work?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Slider
                aria-label="Bus Riding"
                size="medium"
                defaultValue={3}
                step={1}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                onChange={(e) => setBusTaken(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography variant="p">
                Rode your bike instead of driving to work?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Slider
                aria-label="Bike Riding"
                size="medium"
                defaultValue={2}
                step={1}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                onChange={(e) => setBikeTaken(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            sx={{
              // border: "2px solid blue",
              mt: 2,
            }}
          >
            <Grid item xs={8} sm={10} md={10} lg={10}>
              <Box
                sx={{
                  // border: "2px solid blue",
                  display: "flex",
                  // justifyContent: 'right'
                  // fontSize: '1vw'
                }}
              >
                <h3>Upped your score by: {loweredScore()} </h3>
              </Box>
            </Grid>
            <Grid item xs={4} sm={2} md={2} lg={2}>
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
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
