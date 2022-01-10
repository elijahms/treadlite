import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom'

const NavBar = () => {

    return (
        <Grid container>
        <Grid item xs={6} md={3} s={3}>
        <div className='nav-bar-item' >
            <NavLink 
            activeStyle={{color: '#002884'}}
            exact to="/">
                Home
            </NavLink></div>
        </Grid>
        <Grid item xs={6} md={3} s={3}>
        <div className='nav-bar-item' >
            <NavLink
            activeStyle={{color: '#002884'}}
            exact to="/newevent">
                New Event
            </NavLink></div>
        </Grid>
        <Grid item xs={6} md={3} s={3}>
        <div className='nav-bar-item' >
            <NavLink 
            activeStyle={{color: '#002884'}}
            exact to="/mynotes">
                My Events
            </NavLink></div>
        </Grid>
        <Grid item xs={6} md={3} s={3}>
        <div className='nav-bar-item'>
            <NavLink
            activeStyle={{color: '#002884'}}
            exact to="/login">
                Logout
            </NavLink></div>
        </Grid>
        </Grid>
    )
}

export default NavBar
