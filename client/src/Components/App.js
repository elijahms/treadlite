import NavBar from "./NavBar";
import SignUpPage from "./SignupPage";
import { Route, Switch } from "react-router-dom";
import {useState, useEffect} from 'react'
import LoginPage from "./LoginPage";
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';


function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then(console.log("no user"))
      }
    });

  }, []);
  
 
  return (
  <div>
    <CssBaseline />
    <NavBar />
    <Divider variant="middle"/>
    <Switch>
        <Route path="/newevent">
        <LoginPage setUser={setUser} />
        </Route>
        <Route exact path="/login">
        <SignUpPage setUser={setUser} />
        </Route>
        <Route exact path="/mynotes">
        <SignUpPage setUser={setUser} />
        </Route>
        <Route path="/">  
        <SignUpPage setUser={setUser} />
        </Route>
      </Switch>
  </div>
  );
  
}

export default App;
