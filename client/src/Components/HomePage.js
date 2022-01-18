import Box from "@mui/material/Box";

const HomePage = () => {
  return (
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
        <Box
          sx={{
            mt: "6vh",
            alignItems: "center",
          }}
        >
          <img style={{ width: "80vw" }} src="logo_transparent.png" />
          <h1 style={{ color: "white", textAlign: "center", fontSize: "3vw" }}>
            {"Make less of an impact."}
          </h1>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
