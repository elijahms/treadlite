import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";

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
            height: "50vh",
            m: 3,
          }}
        >
          <Typography
            sx={{
              mt: 3,
              // border: "2px solid red",
              textAlign: "center",
            }}
            variant="h4"
          >
            Up Your Score!
          </Typography>
          <Typography variant="h5">....What did you do this week?</Typography>

          <Grid
            container
            spacing={0}
            sx={{
              // border: "2px solid blue",
              mt: 2,
            }}
          >
            <Grid item lg={4} sm={12}>
              <Typography sx={{ alignText: "left" }} variant="p">
                Took the bus instead of driving to work?
              </Typography>
            </Grid>
            <Grid item lg={8} sm={12}>
              <Slider
                aria-label="Custom marks"
                size="medium"
                defaultValue={3}
                step={1}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                onChange={(e) => setBusTaken(e.target.value)}
              />
            </Grid>
            <Grid item lg={4} sm={12}>
              <Typography variant="p">
                Took the bus instead of driving to work?
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Slider
                aria-label="Custom marks"
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
            <Grid item lg={8}>
              <Box
                sx={{
                  // border: "2px solid blue",
                  display: "flex",
                  // justifyContent: 'right'
                }}
              >
                <h3>You raised your score by: {loweredScore()} </h3>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box
                sx={{
                  // border: "2px solid blue",
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
    </Container>
  );
};

export default TreadliterPage;
