import Box from "@mui/material/Box";

const HomePage = () => {
  return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "pre-line",
            height: '80vh',
          }}
          className='hero-image'
        >
          <h1
          style={{color: 'white', marginTop: '20%', textAlign: 'center'}}
          >{"Treadliter - Reduce Your Carbon Footprint"}</h1>
        </Box>
  );
};

export default HomePage;
