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
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let faq = [
    {
      faq_title: "How do 'trends' work?",
      faq_content:
        "Each week you have an opportunity to improve. Once a week, input your activity from the previous week to see if your trends have moved up, down, or stayed the same. In the 'friends' tab, other users' trends are denoted with emojis based on their trends: three stars for going up, two cool faces for staying the same, and one face-palm person for going down.",
    },
    {
      faq_title: "How is my score calculated?",
      faq_content: "It's a secret.",
    },
    {
      faq_title: "No really, how is my score calculated?",
      faq_content:
        "It is an evolving calculation, but as of 1/23/2022, the four categories of transportation, living, shopping, and eating are weighted 32.5%, 39%, 10%, and 18.5%, respectfully. A user is given a score out of 100 in each of these categories and then their total score is calculated using these weighted averages. The exact calculation for each category can be viewed in the source code, but it ranges from the relatively complex 'living' calculation to the relatively simple 'eating' calculation. ",
    },
  ];

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 5 }}>
      <Paper elevation={2} sx={{ borderRadius: "12px" }}>
        <Box
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ml: 2,
            mr: 2,
            p: 1.2,
            whiteSpace: "pre-line",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 5,
              mt: 3,
              fontSize: "1.4rem",
              "@media only screen and (max-width: 600px)": {
                fontSize: "1.3rem",
              },
            }}
          >
            {
              "Understand your carbon footprint with Treadlite"
            }
          </Typography>
          <Typography variant="h6" sx={{ mb: 5 }}>
            {
              "So how does it work 🤔🤔 \n \n 1️⃣ Input information about your habits in four categories - 'transporation', 'home', 'food', and 'shopping'. \n\n 2️⃣ Your score is calculated (head over to the 'dashboard' page to view). \n\n 3️⃣ Your score is converted to a percentage for accessiblity 👍 understandablness ✨ and comparability🔥.\n\n 🦶🦶 'treadliter' page is a resource to encourage healthy carbon footprint habits, and each week a user can input their activites and see how they trend that week. \n\n🤝🤝 'friends' is a resource for users to see other treadliters' scores and trends. If one wishes, they can follow other users or see top users."
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
            align="center"
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
              mt: 5,
            }}
          >
            Image credit on the homepage: <cite>George Evans</cite>{" "}
          </Typography>
          <Typography
            variant="p"
            align="center"
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
            }}
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
