import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, DrawerHeader, Main } from "./MUI";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./SignupPage";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LoginPage from "./LoginPage";
import AccountPage from "./AccountPage";
import Friends from "./Friends";

const MainPage = () => {
  
  const drawerWidth = 200;
  //refers to the sidebar with the embedded menu
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  //to fetch a user using cookies
  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then(console.log("no user"));
      }
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              Treadlite
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setOpen(true)}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      <Main open={open}>
        <Switch>
          <Route path="/about">
            <SignUpPage setUser={setUser} />
          </Route>
          <Route path="/treadliter">
            <SignUpPage setUser={setUser} />
          </Route>
          <Route exact path="/friends">
            <Friends />
          </Route>
          <Route exact path="/account">
            {!user ? (
              <SignUpPage setUser={setUser} />
            ) : (
              <AccountPage setUser={setUser} user={user} />
            )}
          </Route>
          <Route path="/login">
            <LoginPage setUser={setUser} />
          </Route>
          <Route path="/">
            <SignUpPage setUser={setUser} />
          </Route>
        </Switch>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <NavLink activeStyle={{ color: "#002884" }} exact to="/account">
            <ListItem button key="Me">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Me" />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: "#002884" }} exact to="/friends">
            <ListItem button key="Friends">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: "#002884" }} exact to="/treadliter">
            <ListItem button key="Treadliter">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Treadliter" />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: "#002884" }} exact to="/about">
            <ListItem button key="About">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </NavLink>
          {/* <ListItem key="Login">
            <ListItemText primary="Bluetooth" />
            <Switch edge="end" />
          </ListItem> */}
        </List>
      </Drawer>
    </Box>
  );
};

export default MainPage;
