import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const DashboardPage = () => {
  const [user, setUser] = useState({ score: 0 });

  useEffect(() => {
    fetch("/api/dashboard").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
          setUser(user);
        });
      } else {
        r.json().then(console.log("no user"));
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ml: 2,
            mr: 2,
            pb: 5,
            whiteSpace: "pre-line",
            // border: '2px solid red'
          }}
        >
          <h3>{"YOUR SCORE"}</h3>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              mt: 0.6,
            }}
          >
            <CircularProgress size='300px'variant="determinate" value={user.score} />
            <Box
              sx={{
                top: 1,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ fontSize: "8rem" }}
              >
                {`${user.score}`}
              </Typography>
            </Box>
          </Box>
          <h3>{"YOUR IN THE"} {"PERCENTILE OF TREADLITERS"}</h3>
        </Box>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
