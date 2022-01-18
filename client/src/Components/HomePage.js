import Box from "@mui/material/Box";

const HomePage = () => {
  return (
    <div>
    <div className="hero-image">
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
          <h1 className="homescreen-tagline">{"Make less of an impact."}</h1>
        </Box>
      </Box>
    </div>
    <div style={{height: '100vh', marginTop: '10vh'}}>
      <p>1</p>
    </div>
    </div>
  );
};

export default HomePage;
