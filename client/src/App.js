import NewNote from "./NewNote";
import NavBar from "./NavBar";
import MyNotes from "./MyNotes";
import Logout from "./Logout";
import LoadingPage from "./LoadingPage";
import SignUpPage from "./SignupPage";
import { Route, Switch } from "react-router-dom";
import {useState, useEffect} from 'react'
import NewLoginPage from "./NewLoginPage";
import NewAddEvent from "./NewAddEvent";
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';


function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        setIsLoading(false);
      } else {
        r.json().then(console.log("no user"))
      }
    });

  }, []);

  if (!user) {
    console.log(user)
    return (
      <Switch>
          <Route exact path="/login"> 
          {isLoading ? <LoadingPage /> : <NewLoginPage setUser={setUser} />}
          </Route>
          <Route path="/"> 
            {isLoading ? <LoadingPage /> : <SignUpPage setUser={setUser} />}
          </Route>
      </Switch>
    ) 
  }
 
  return (
  <div>
    <CssBaseline />
    {/* <h3> Welcome {user.first_name} </h3> */}
    <NavBar />
    <Divider variant="middle"/>
    <Switch>
        <Route path="/newevent">
        {/* <AddEvents user={user} /> */}
        <NewAddEvent user={user} />
        </Route>
        <Route exact path="/login">
        <Logout setUser={setUser}/>
        </Route>
        <Route exact path="/mynotes">
        <MyNotes user={user} />
        </Route>
        <Route path="/">  
        <NewNote user={user} />
        </Route>
      </Switch>
  </div>
  );
  
}

export default App;
