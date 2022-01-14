import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";

const AboutPage = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation="12">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ml: 2,
            mr: 2,
            whiteSpace: "pre-line",
            minHeight: "70vh",
          }}
        >
          <h3>
            {
              "Treadliter is project aimed at informing people about their Carbon Footprint by seeing how they compare to people around them"
            }
          </h3>
          <h5>
            {
              "Users input information about their habits and recieve a score. The score is normailized to be out of 100, so as to make it more accesable and understandable.\n \n A zero is the largest footprint a reasonable person in the US produces. Lets say the 95th percentile and up.\n \n An 100 is the smallest footprint. The 5th percentile on the other end of the spectrum."
            }
          </h5>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
