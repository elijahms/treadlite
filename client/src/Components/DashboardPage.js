import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const DashboardPage = () => {
  const [userStats, setUserStats] = useState({
    score: 0,
    rank: 0,
    avg_score: 0,
    best_cat: "n/a",
    worst_cat: 'n/a'
  });

  useEffect(() => {
    fetch("/api/dashboard").then((r) => {
      if (r.ok) {
        r.json().then((userstats) => {
          setUserStats(userstats);
        });
      } else {
        r.json().then(() => {
          console.log("Not Signed In");
        });
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{mb: 15}}>
      <Paper
      sx={{
        borderRadius: "12px",
      }}
      >
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ml: 2,
            mr: 2,
            pb: 5,
            whiteSpace: "pre-line",
          }}
        >
          <Typography
            component="h2"
            color="text.primary"
            sx={{ fontSize: "2.5rem", mt: 2, mb: 2}}
          >
            {"YOUR SCORE"}
          </Typography>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              mt: 0.6,
              mb: 2
            }}
          >
            <CircularProgress
              size="9rem"
              variant="determinate"
              value={userStats.score}
            />
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
                sx={{ fontSize: "4rem" }}
              >
                {`${userStats.score}`}
              </Typography>
            </Box>
          </Box>
          <Typography
            component="h3"
            align='center'
            color="text.secondary"
            sx={{ fontSize: "1.5rem", mt: 2 }}
          >
            {"YOU'RE RANKED #"}{" "}
            <span style={{ color: "#7558cc" }}>{userStats.rank}</span>{" "}
            {"  OUT OF ALL TREADLITERS"}
          </Typography>
          <Typography
            component="h3"
            align='center'
            color="text.secondary"
            sx={{ fontSize: "1.5rem", mt: 2 }}
          >
            {"The average Treadliter score is: "}{" "}
            <span style={{ color: "#7558cc" }}>{userStats.avg_score}</span>
          </Typography>
          {/* <Typography
            component="h3"
            color="text.secondary"
            sx={{ fontSize: "1.5rem", mt: 2 }}
          >
            {"You're totally rocking the "}<span style={{ color: "#7558cc" }}>{userStats.best_cat}</span>{" category."}
            
          </Typography>
          <Typography
            component="h3"
            color="text.secondary"
            sx={{ fontSize: "1.5rem", mt: 2 }}
          >
            {"It looks like you have room to improve in the "}<span style={{ color: "#7558cc" }}>{userStats.worst_cat}</span>{" category."}
          </Typography> */}
        </Box>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
