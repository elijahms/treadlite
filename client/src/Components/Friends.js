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
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
//import { FixedSizeList as List } from "react-window";

const Friends = ({ user }) => {
  const [friendList, setFriendList] = useState([
    { username: "The Greenest", score: 100, avatar: "T", id: 0 },
  ]);
  const [search, setSearch] = useState("");
  const [followFriend, setFollowFriend] = useState(null);
  const [chipClick, setChipClick] = useState("All");
  const [followingList, setFollowingList] = useState([""]);

  function handleSearch(e) {
    e.preventDefault();
    // console.log(search);
    let searchedList = [...friendList].filter((f) =>
      f.username.startsWith(e.target.value)
    );
    setFriendList(searchedList);
    // setSearch(null)
  }

  function followFunc(friend, id) {
    const form = {
      username: friend,
    };
    console.log(form);
    fetch("/api/newfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((friendship) => {
          console.log(friendship);
          console.log(followingList);
          setFollowingList([...followingList, [id]]);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
          console.log(id);
          let removeFollow = [...followingList].filter(
            (follow) => follow[0] === id
          );
          console.log(followingList);
          console.log(removeFollow);
          //setFollowingList(removeFollow)
        });
      }
    });
  }

  useEffect(() => {
    fetch("api/users").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          setFriendList(data);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
    fetch("api/following").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          setFollowingList(data);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="md">
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
            placeholder="Follow other Treadlite-rs"
            inputProps={{ "aria-label": "search treadlite" }}
            onChange={(e) => handleSearch(e)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            // onClick={handleSearch}
          >
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
            color={chipClick === "All" ? "primary" : "default"}
            onClick={() => setChipClick("All")}
          />
          <Chip
            clickable
            label="Following"
            color={chipClick === "Following" ? "primary" : "default"}
            onClick={() => setChipClick("Following")}
          />
          <Chip
            clickable
            label="Followers"
            color={chipClick === "Followers" ? "primary" : "default"}
            onClick={() => setChipClick("Followers")}
          />
          <Chip
            clickable
            label="Top Users"
            color={chipClick === "Top" ? "primary" : "default"}
            onClick={() => setChipClick("Top")}
          />
        </Stack>
      </Box>
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
          {[...friendList]
            .filter((f) => {
              if (chipClick === "All") {
                return true;
              } else if (chipClick === "Followers") {
                return false;
              } else if (chipClick === "Top") {
                return f.score >= 90;
              } else {
                return followingList.toString().includes(f.id);
              }
            })
            .map((friend, index) => {
              return (
                <div key={index}>
                  <Paper elevation={index}>
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
                        {[...followingList].toString().includes(friend.id) ? (
                          <ClearRoundedIcon color="error" />
                        ) : (
                          <AddRoundedIcon color="primary" />
                        )}
                      </IconButton>

                      <ListItemAvatar>
                        <Avatar>{friend.avatar}</Avatar>
                      </ListItemAvatar>
                      <ListItemText edge="end" primary={friend.username} />
                    </ListItem>
                  </Paper>
                </div>
              );
            })}
        </List>
      </Box>
    </Container>
  );
};

export default Friends;
