import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { useSpring, animated, config } from '@react-spring/web'
import { useState } from "react";
import FootprintTwo from '../Images/footprinttwo.jpg'

const HomePage = () => {

  const [mainText, setMainText] = useState("Make less of an impact.")
  const [flip, set] = useState(false)

  const MainText = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    delay: 2000,
    config: config.molasses,
    reset: true,
    reverse: flip,
    onRest: () => set(!flip)
  })

  const MainDiv = useSpring({
    to: { filter: 'brightness(50%)' },
    from: { filter: 'brightness(80%)' },
    delay: 2500,
    config: config.molasses,
    height: "92vh"
  })

  return (
    <div style={{ backgroundColor: "#A6CF98" }}>
      <animated.div
        className="hero-image"
        style={MainDiv}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "pre-line",
            height: "90vh",
            width: "100vw",
            pl: 0,
          }}
        >
          <Box sx={{ mt: "6vh", pl: 2, pr: 2, alignItems: "center" }}>
            <animated.div style={MainText} >
            <Typography
              sx={{
                mt: 5,
                filter: "brightness(200%)",
                color:  '#FFFFFF',
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
          </Box>
        </Box>
      </animated.div>
      <div style={{ height: "100vh", marginTop: "10vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "pre-line",
            height: "90vh",
            width: "100vw",
          }}
        >
          {/* <Box
          component="img"
          sx={{width: 400,
            position: 'absolute',
            top: 1000,
            left: 20,
            borderRadius: '10px',
          }}
            src={FootprintTwo}
          >
          </Box> */}
          <Box sx={{ mt: 17, pl: 5, pr: 5, alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              {
                "Treadliter is a tool to input, understand, track, and compare your estimated carbon footprint with youself and peers. \n \n If this is your first time here, head over to to the "
              }
              <NavLink exact to="/account">
                account
              </NavLink>
              {
                " section to set up your profile. \n \n If you want to know more about what this project is about heading over to "
              }
              <NavLink exact to="/about">
                about
              </NavLink>
              {" section."}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
