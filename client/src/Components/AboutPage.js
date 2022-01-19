import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const AboutPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={12}>
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ml: 2,
            mr: 2,
            p: 2,
            whiteSpace: "pre-line",
          }}
        >
          <h3>
            {
              "Treadliter aims to inform people about their carbon footprint by seeing how they compare to people around them."
            }
          </h3>
          <h5>
            {
              "How does it work? \n \n On the 'account' page a user inputs information about their habits inf four categories - 'transporation', 'home', 'food', 'shopping' - once inputted a users score is calculated. To view ones score, head over to the 'dashboard' page. \n\n The score is normailized to be on a scale of 1 - 100, to be more accessable, understandable, and comparable.\n \n A zero represents the largest (worst) carbon footprint a reasonable person in the US outputs (approx. 95th + percentile). \n \n A score of 100 represents the smallest reasonable carbon footprint (approx. 5th percentile and lower). \n\n The 'friend' page is a resource for users to see other treadliters' scores and trends. If one wishes they can follow other users, or see top users. \n\n Finally, the 'treadliter' page is a resource to encourage healthy carbon footprint habits, and each week a user can input their weekly activites and see how they trend that week."
            }
          </h5>
          <p>Image credit on the homepage: <cite>George Evans</cite> </p>
          <p>Thank you to the team behind MUI for making this project beautiful.</p>
          <a href="https://github.com/elijahms/treadlite">Check out Github for more details</a>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
