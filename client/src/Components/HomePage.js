import Box from "@mui/material/Box";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        whiteSpace: "pre-line",
        height: "80vh",
      }}
      className="hero-image"
    >
      <h1
        style={{
          color: "white",
          marginTop: "7%",
          textAlign: "center",
          fontSize: 100,
        }}
      >
        {"Treadliter"}
      </h1>
      <h1 style={{ color: "white", textAlign: "center", fontSize: 60 }}>
        {"Make less of an impact."}
      </h1>
    </Box>
  );
};

export default HomePage;
