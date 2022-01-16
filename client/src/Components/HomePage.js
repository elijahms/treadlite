import Box from "@mui/material/Box";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        whiteSpace: "pre-line",
        height: "90vh",
        // float: 'left',
        // borderRadius: '7px',
        width: "100vw",
        // border: '2px solid red',
        pl: 0,
        // positionLeft: '0px',
        // postitionTop: '0px'
      }}
      className="hero-image"
    >
      <Box
        sx={{
          mt: "6vh",
          alignItems: "center",
          //  border: '2px solid blue'
        }}
      >
        {/* <h1
        style={{
          color: "white",
          marginTop: "7%",
          textAlign: "center",
          fontSize: '7vw',
        }}
      >
        {"Treadlite"}
      </h1> */}
        <img style={{ width: "80vw" }} src="logo_transparent.png" />
        <h1 style={{ color: "white", textAlign: "center", fontSize: "3vw" }}>
          {"Make less of an impact."}
        </h1>
      </Box>
    </Box>
  );
};

export default HomePage;
