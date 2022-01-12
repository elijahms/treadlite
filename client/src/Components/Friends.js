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

const Friends = () => {
  const [friendList, setFriendList] = useState([
    {
      name: "maddie",
      score: 69,
    },
  ]);

  useEffect(() => {
    fetch("api/users").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          let listOfFriends = [];
          data.map(
            (f) =>
              (listOfFriends = [
                ...listOfFriends,
                {
                  name: f[0],
                  score: f[1],
                  avatar: f[0][0],
                },
              ])
          );
          console.log(listOfFriends);
          setFriendList(listOfFriends);
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
            placeholder="Search Treadlite"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
        }}
      >
        <Paper>
          <List>
            {[...friendList].map((friend, index) => {
              return (
                <div>
                  <ListItem
                    secondaryAction={
                      <ListItemText primary={friend.score + "/100"} />
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>{friend.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText edge="end" primary={friend.name} />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Friends;
