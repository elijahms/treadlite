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
  const [mainText, setMainText] = useState("Make less of an impact.");
  const [flip, set] = useState(false);
  let screenSize = window.innerWidth;

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
          <Box sx={{ mt: "6vh", pl: 2, pr: 2, alignItems: "center" }}>
            <animated.div style={MainText}>
              <Typography
                sx={{
                  mt: 5,
                  filter: "brightness(200%)",
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: "10vw",
                  "@media only screen and (max-width: 600px)": {
                    fontSize: "22vw",
                  },
                }}
              >
                {mainText}
              </Typography>
            </animated.div>
            <Box>
              <svg class="arrows">
                <path class="a1" d="M0 0 L30 32 L60 0"></path>
                <path class="a2" d="M0 20 L30 52 L60 20"></path>
                <path class="a3" d="M0 40 L30 72 L60 40"></path>
              </svg>
            </Box>
          </Box>
        </Box>
      </animated.div>
      <Grid
        container
        spacing={5}
        sx={{
          // display: "flex",
          // flexDirection: "column",
          backgroundColor: "#A6CF98",
          alignItems: "center",
          whiteSpace: "pre-line",
          // height: "90vh",
          width: "100vw",
          pl: 2,
          pr: 2,
          ml: 0,
          mr: 0,
          mt: 5,
          pb: 7,
          // border: "2px solid red",
        }}
      >
        <Grid
          xs={12}
          lg={4}
          sx={{
            // border: "2px solid red",
            justify: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              // width: 650,
              // display: 'flex',
              width: "100%",
              // border: "2px solid blue",
            }}
            src={SocialPerson}
          ></Box>
        </Grid>
        <Grid
          xs={12}
          lg={8}
          sx={
            {
              //  border: "2px solid red"
            }
          }
        >
          <Box
            sx={{
              mt: 0,
              mb: 0,
              // pl: 3,
              // pr: 3,
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
          <Grid
            xs={12}
            sx={
              {
                // border: "2px solid red"
              }
            }
          >
            <Box
              component="img"
              sx={{
                // width: 650,
                // display: 'flex',
                width: "100%",
                // border: "2px solid blue",
              }}
              src={Adventure}
            ></Box>
          </Grid>
        )}
        <Grid
          xs={12}
          lg={6}
          sx={
            {
              //  border: "2px solid red"
            }
          }
        >
          <Box
            sx={{
              // mt: 8.5,
              // mb: 10,
              // pl: 3,
              // pr: 3,
              p: 2,
            }}
          >
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
          sx={
            {
              // border: "2px solid red"
            }
          }
        >
          <Box
            component="img"
            sx={{
              // width: 650,
              // display: 'flex',
              width: "100%",
              // border: "2px solid blue",
            }}
            src={MomentToRemember}
          ></Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100vw",
          justify: "center",
          pl: "42vw",
        }}
      >
        <Typography
          variant="p"
          align="justify"
          sx={{
            color: "text.primary",
          }}
        >
          {"Elijah Silverman - 2022 "}
        </Typography>
      </Box>
      <img src={Adventure}/>
    </div>
  );
};

export default HomePage;
