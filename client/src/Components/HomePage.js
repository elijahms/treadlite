import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { useSpring, animated, config } from '@react-spring/web'
import { useState, useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0)
  
  }, []);

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
      <div style={{ height: "110vh", marginTop: "10vh" }}>
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
          <Box sx={{ mt: 7.5, mb: 10, pl: 3, pr: 3, alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              {
                "Treadlite is a tool to input, understand, track, and compare your estimated carbon footprint. \n \n If this is your first time here, head over to to the "
              }
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
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
