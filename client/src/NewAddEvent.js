import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import {useState} from 'react'
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import NativeSelect from '@mui/material/NativeSelect';
import { DateTime } from "luxon";


const NewAddEvent = ({user}) => {

    const now = DateTime.now()
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [startValue, setStartValue] = useState(now);
    const [eventName, setEventName] = useState('')
    const [endValue, setEndValue] = useState(now);
    const [startTimeValue, setStartTimeValue] = useState('09:00');
    const [endTimeValue, setEndTimeValue] = useState('11:00');
    const [weekday, setWeekday] = useState('Monday')

    console.log(startValue)

    function formReset() {
      setEventName('')
      setStartTimeValue('09:00')
      setEndTimeValue('11:00')
    }

    function handleSubmit(e) {
      e.preventDefault();
      const form = {
          start_date: startValue,
          end_date: endValue,
          weekday: weekday,
          start_hour: startTimeValue,
          end_hour: endTimeValue,
          name: eventName,
          user_id: user.id,
        }
      console.log(form)

      fetch("/api/events", {
      method: "POST",
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(form)
      })
      .then((r) => r.json())
      .then((data) => {
          console.log(data);
      })
      formReset()
      alert('Your event was added')
    }

  return (
      <Container component="main" maxWidth="sm">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
            padding: '10px'
          }}
        >
          <Typography component="h1" variant="h5" sx={{color: 'black'}}>
            Add Event
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  required
                  // error = 'false'
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  value={eventName}
                  onChange={(e) => {setEventName(e.target.value);}}
                  helperText="Enter an Event Name e.g. Bio 101"
                />
              </Grid>
              <Grid item xs={12} lg={5.2}>
              <DesktopDatePicker
                // disablePast
                id='start-date'
                label="Start Date"
                name='start-date'
                inputFormat="MM/dd/yyyy"
                value={startValue}
                onChange={(startValue) => {setStartValue(startValue)}}
                renderInput={(params) => <TextField {...params} />}/>
              </Grid>
              <Grid item xs={6} sm={6} lg={3} >
              <TextField
                    id="start-time"
                    onChange={(e) => {setStartTimeValue(e.target.value)}}
                    label="Start Time"
                    type="time"
                    value = {startTimeValue}
                    sx={{width: '1'}}
                    />
            </Grid>
            <Grid item xs={6} sm={6} lg={3} >
            <TextField
                    id="end-time"
                    onChange={(e) => {
                      setEndTimeValue(e.target.value);
                    }}
                    label="End Time"
                    type="time"
                    value = {endTimeValue}
                    sx={{width: '1'}}
                    />
                    </Grid>
              <Grid item xs={12} lg={5.2}>
              <DesktopDatePicker
                // disablePast
                id='end-date'
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={endValue}
                onChange={(endValue) => {setEndValue(endValue)}}
                renderInput={(params) => <TextField {...params} />}/>
              </Grid>
              <Grid item xs={12} lg={6.8}>
              <TextField
                  value={weekday}
                  select
                  id ='weekday'
                  label="Weekday"
                  SelectProps={{
                    native: true,
                  }}
                  onChange={(e) => {setWeekday(e.target.value);}}>
                    {weekdays.map((w) => <option key={w} value={w}>{w}</option>)}
                  </TextField>
                  
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            </LocalizationProvider>
          </Box>
        </Box>
      </Container>
  )
}

export default NewAddEvent