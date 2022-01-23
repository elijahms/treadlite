import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlined from "@mui/icons-material/EmailOutlined";

const AboutPage = () => {
  let faq = [
    {
      faq_title: "How does 'trends' work?",
      faq_content:
        "Every week you have an opporuntity to improve. Once a week input your activity from the previous week to see if you're moving up, down, or staying the same. In the 'Friends' tab other Users' trends are denoted with emoji based on their trends. Three stars for going up, two cool faces for staying the same, and one face-palm person for going down.",
    },
    {
      faq_title: "How is my score calculated?",
      faq_content: "It's a secret.",
    },
    {
      faq_title: "No really, how is my score calculated?",
      faq_content:
        "It's is an evolving calculation, but as of 1/23/2022, the four categories: transportation, living, shopping, and eating are weighted 32.5%, 39%, 10%, and 18.5% respectfully. A user is given a score out of 100 in each of these caterogies and then their total score is calculated using these weighted averages. The exact calculation for each can be seen in the source code, but it ranges from the relatively complex 'living' calculation to the relatively simple 'eating' calculation. ",
    },
  ];

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 5 }}>
      <Paper elevation={2} sx={{ borderRadius: "12px" }}>
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
          <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
            {
              "Treadliter aims to inform people about their carbon footprint by seeing how they compare to people around them."
            }
          </Typography>
          <Typography variant="h6" sx={{ mb: 5 }}>
            {
              "How does it work? \n \n On the 'account' page a user inputs information about their habits inf four categories - 'transporation', 'home', 'food', 'shopping' - once inputted a users score is calculated. To view ones score, head over to the 'dashboard' page. \n\n The score is normailized to be on a scale of 1 - 100, to be more accessable, understandable, and comparable.\n \n A zero represents the largest (worst) carbon footprint a reasonable person in the US outputs (approx. 95th + percentile). \n \n A score of 100 represents the smallest reasonable carbon footprint (approx. 5th percentile and lower). \n\n The 'friend' page is a resource for users to see other treadliters' scores and trends. If one wishes they can follow other users, or see top users. \n\n Finally, the 'treadliter' page is a resource to encourage healthy carbon footprint habits, and each week a user can input their weekly activites and see how they trend that week."
            }
          </Typography>
          <Typography variant="h5" sx={{ mt: 4 }}>
            FAQ
          </Typography>
          {faq.map((q, index) => {
            return (
              <Accordion key={index} sx={{ minWidth: "100%" }} elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{q.faq_title}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ color: "text.secondary" }}>
                  <Typography>{q.faq_content}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
          <Typography
            variant="p"
            sx={{ color: "text.secondary", fontSize: "0.8rem", mt: 5 }}
          >
            Image credit on the homepage: <cite>George Evans</cite>{" "}
          </Typography>
          <Typography
            variant="p"
            sx={{ color: "text.secondary", fontSize: "0.8rem" }}
          >
            Thank you to the team behind MUI for making this project beautiful.
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, m: 4 }}
            alignItems="center"
          >
            <a
              href="https://github.com/elijahms/treadlite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ fontSize: "4rem", color: "black" }} />
            </a>
            <a
              href="https://www.linkedin.com/in/elijah-silverman-917a91a5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon sx={{ fontSize: "4rem", color: "#0077B5" }} />
            </a>
            <a
              href="mailto:elijahmsilverman@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EmailOutlined sx={{ fontSize: "4.2rem", color: "#657786" }} />
            </a>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
