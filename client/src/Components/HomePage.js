import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import { useSpring, animated, config } from "@react-spring/web";
import { useState, useEffect } from "react";
import SocialPerson from "../assets/socialperson.svg";
import Adventure from "../assets/adventure.svg";
import MomentToRemember from "../assets/momenttoremember.svg";

const HomePage = () => {
  const [mainText] = useState("Make less of an impact.");
  const [flip, set] = useState(false);
  let screenSize = window.innerWidth;

  //   const heightOutput = document.querySelector("#height");
  //   const widthOutput = document.querySelector("#width");

  //  function reportWindowSize() {
  //    heightOutput.textContent = window.innerHeight;
  //    widthOutput.textContent = window.innerWidth;
  //  }

  //  window.onresize = reportWindowSize;

  // let windowSize = document.documentElement.clientWidth
  // window.onresize = function() {return windowSize};

  const MainText = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    delay: 2000,
    config: config.molasses,
    reset: true,
    reverse: flip,
    onRest: () => set(!flip),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const MainDiv = useSpring({
    to: { filter: "brightness(50%)" },
    from: { filter: "brightness(80%)" },
    delay: 2500,
    config: config.molasses,
    height: "92vh",
  });

  return (
    <div style={{ backgroundColor: "#A6CF98" }}>
      <animated.div className="hero-image" style={MainDiv}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "pre-line",
            height: "91vh",
            width: "100vw",
            ml: 0,
            mr: 0,
            // border: '2px solid blue'
          }}
        >
          <Box sx={{ mt: "4vh", pl: 2, pr: 2, alignItems: "center" }}>
            <animated.div style={MainText}>
              <Typography
                sx={{
                  mt: 4,
                  filter: "brightness(200%)",
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: "10vw",
                  "@media only screen and (max-width: 500px)": {
                    fontSize: "4rem",
                  },
                }}
              >
                {mainText}
              </Typography>
            </animated.div>
            <Box component="a" href="#learn-more">
              <svg className="arrows">
                <path className="a1" d="M0 0 L30 32 L60 0"></path>
                <path className="a2" d="M0 20 L30 52 L60 20"></path>
                <path className="a3" d="M0 40 L30 72 L60 40"></path>
              </svg>
            </Box>
          </Box>
        </Box>
      </animated.div>
      <Grid
        id="learn-more"
        container
        spacing={5}
        sx={{
          backgroundColor: "#A6CF98",
          alignItems: "center",
          whiteSpace: "pre-line",
          width: "100vw",
          pl: 2,
          pr: 2,
          ml: 0,
          mr: 0,
          mt: 5,
          pb: 7,
        }}
      >
        <Grid xs={12} lg={4} sx={{ display: "flex" }}>
          <Box
            component="img"
            sx={{
              width: "80%",
              margin: "auto",
            }}
            src={SocialPerson}
          ></Box>
        </Grid>
        <Grid xs={12} lg={8}>
          <Box
            sx={{
              mt: 0,
              mb: 0,
              p: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "text.secondary",
              }}
            >
              <span style={{ color: "#7558cc" }}>Treadlite</span>{" "}
              {
                "is a tool to input, understand, track, and compare your estimated carbon footprint."
              }
            </Typography>
          </Box>
        </Grid>
        {screenSize < 600 && (
          <Grid sx={{ display: "flex" }} xs={12}>
            <Box
              component="img"
              sx={{
                margin: "auto",
                width: "80%",
              }}
              src={Adventure}
            ></Box>
          </Grid>
        )}
        <Grid xs={12} lg={6}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              {"If this is your first time here, head over to to the "}
              <NavLink exact to="/account">
                account
              </NavLink>
              {
                " section to set up your profile. To learn more about this project, head over to the "
              }
              <NavLink exact to="/about">
                about
              </NavLink>
              {" section."}
            </Typography>
          </Box>
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            display: "flex",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "60%",
              margin: "auto",
            }}
            src={MomentToRemember}
          ></Box>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{
          width: "100vw",
          justify: "center",
        }}
      >
        <Grid>
          <Typography
            variant="p"
            align="justify"
            sx={{
              color: "text.primary",
            }}
          >
            {"Elijah Silverman - 2022 "}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
