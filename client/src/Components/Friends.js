import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Snackbar from "@mui/material/Snackbar";

const Friends = ({ user }) => {
  const [friendList, setFriendList] = useState([
    { username: "The Greenest", score: 100, avatar: "T", id: 0, trend: 8 },
  ]);
  const [searchList, setSearchList] = useState([
    { username: "The Greenest", score: 100, avatar: "T", id: 0, trend: 8 },
  ]);
  const [chipClick, setChipClick] = useState("All");
  const [followingList, setFollowingList] = useState([""]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [err, setErr] = useState("");
  const [followerList, setFollowerList] = useState([""]);
  const [snackMsg, setSnackMsg] = useState("");
  const [userData, setUserData] = useState({
    username: "User",
    score: 0,
    avatar: "U",
    trend: 8,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  function handleSearch(e) {
    e.preventDefault();
    let searchedList = [...friendList].filter(
      (f) =>
        f.username.toLowerCase().startsWith(e.target.value) ||
        f.username.startsWith(e.target.value)
    );
    setSearchList(searchedList);
  }

  function followFunc(friend, id) {
    const form = { username: friend };
    fetch("/api/newfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((mess) => {
          setSnackMsg("Followed");
          setOpenSnackBar(true);
          setFollowingList([...followingList, id]);
        });
      } else {
        r.json().then((err) => {
          setSnackMsg(err.errors);
          setOpenSnackBar(true);
          setFollowingList(() =>
            [...followingList].filter((follow) => follow !== id)
          );
        });
      }
    });
  }

  const trend = (trend) => {
    if (trend > 8) {
      return "⭐⭐⭐";
    } else if (trend === 8) {
      return "😎😎";
    } else {
      return "🤦‍♂";
    }
  };

  useEffect(() => {
    fetch("api/users").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setFriendList(data);
          setSearchList(data);
        });
      } else {
        r.json().then((err) => {
          setErr(err.errors);
        });
      }
    });
    fetch("api/following").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setFollowingList(data.flat());
        });
      } else {
        r.json().then((err) => {
          setErr(err.errors);
        });
      }
    });
    fetch("api/userscore").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUserData(data);
        });
      } else {
        r.json().then((err) => {
          setErr(err.errors);
        });
      }
    });
    fetch("api/getfollowers").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setFollowerList(data);
        });
      } else {
        r.json().then((err) => {
          setErr(err.errors);
        });
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: "105vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "80%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="search for other treadliters"
            inputProps={{ "aria-label": "search treadlite" }}
            onChange={(e) => handleSearch(e)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip
            clickable
            label="All"
            color={chipClick === "All" ? "primary" : "secondary"}
            onClick={() => setChipClick("All")}
          />
          <Chip
            clickable
            label="Following"
            color={chipClick === "Following" ? "primary" : "secondary"}
            onClick={() => setChipClick("Following")}
          />
          <Chip
            clickable
            label="Followers"
            color={chipClick === "Followers" ? "primary" : "secondary"}
            onClick={() => setChipClick("Followers")}
          />
          <Chip
            clickable
            label="Top Users"
            color={chipClick === "Top" ? "primary" : "secondary"}
            onClick={() => setChipClick("Top")}
          />
        </Stack>
      </Box>
      <Paper
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "12px",
          alignItems: "center",
          ml: 10,
          mt: 2,
          mr: 10,
          pt: 0,
          pb: 0
        }}
      >
        <List dense
        sx={{pb: 0.2, pt: 0.2}}
        >
          <ListItem
            dense
            secondaryAction={
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  mt: 0.6,
                }}
              >
                <CircularProgress
                  variant="determinate"
                  sx={{color: "#7558cc"}}
                  value={userData.score}
                />
                <Box
                  sx={{
                    top: 1,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    sx={{ fontSize: "14pt" }}
                  >
                    {`${userData.score}`}
                  </Typography>
                </Box>
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ color: "#7558cc" }}>
                {user ? user.first_name[0] + user.last_name[0] : "U"}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              edge="end"
              // primary={user ? user.username : "User"}
              secondary={trend(userData.trend_num)}
            />
          </ListItem>
        </List>
      </Paper>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          maxHeight: 550,
          overflow: "auto",
          borderRadius: "7px",
        }}
      >
        <List>
          {[...searchList]
            .filter((f) => {
              if (chipClick === "All") {
                return true;
              } else if (chipClick === "Top") {
                return f.score >= 90;
              } else if (chipClick == "Following") {
                return followingList.includes(f.id);
              } else {
                return followerList.includes(f.id)
              }
            })
            .map((friend, index) => {
              return (
                <div key={index}>
                  <Paper elevation={index < 20 ? parseInt(index) : 20}>
                    <ListItem
                      secondaryAction={
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-flex",
                            mt: 0.6,
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={friend.score}
                          />
                          <Box
                            sx={{
                              top: 1,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              component="div"
                              color="text.secondary"
                              sx={{ fontSize: "14pt" }}
                            >
                              {`${friend.score}`}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{
                        mb: 0.5,
                      }}
                    >
                      <IconButton
                        onClick={() => followFunc(friend.username, friend.id)}
                      >
                        {[...followingList].includes(friend.id) ? (
                          <ClearRoundedIcon color="error" />
                        ) : (
                          <AddRoundedIcon color="primary" />
                        )}
                      </IconButton>

                      <ListItemAvatar>
                        <Avatar sx={{ color: "#7558cc" }}>
                          {friend.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        edge="end"
                        primary={friend.username + " " + trend(friend.trend)}
                      />
                    </ListItem>
                  </Paper>
                </div>
              );
            })}
        </List>
      </Box>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackMsg}
      />
    </Container>
  );
};

export default Friends;
