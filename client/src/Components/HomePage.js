import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div
        className="hero-image"
        style={{ height: "92vh", filter: "brightness(50%)" }}
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
            {/* <img className='home-treadlite' style={{ width: "80vw", border: '3px solid white'}} src="logo_transparent.png" /> */}
            <h1
              className="homescreen-tagline"
              style={{ filter: "brightness(200%)" }}
            >
              {"Make less of an impact."}
            </h1>
          </Box>
        </Box>
      </div>
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
          <Box sx={{ mt: 17, pl: 5, pr: 5, alignItems: "center" }}>
            <h1 style={{ color: "grey" }}>
              {
                "Treadliter is a tool to input, understand, track, and compare your estimated carbon footprint with youself and peers. \n \n If this is your first time here, head over to to the "
              }{" "}
              <NavLink exact to="/account">account</NavLink>{" "}
              {"section to set up your profile."}
            </h1>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
