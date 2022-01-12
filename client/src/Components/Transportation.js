import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";


const Transportation = () => {
//   const [carYears, setCarYears] = useState({});
  //   let year = new Date()
  //   const years = Array.from(new Array(20), (val, index) => index + year);
//   const [age, setAge] = useState("");
//   const [value, onChange] = useState(new Date());
//   const [makeNames, setMakeNames] = useState("none");
//   const [currentMake, setCurrentMake] = useState("none");
//   const [currentYear, setCurrentYear] = useState("2022");
  const [MPG, setMPG] = useState(20);
  const [milesDriven, setMilesDriven] = useState(70);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const form = {
      miles_per_gallon: MPG,
      miles_per_week: milesDriven,
    };
    console.log(form);
    
    
    fetch("/api/userrecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userdatum) => {
          console.log(userdatum);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
    // enqueueSnackbar('Successfully Updated Details');
  }

  //   useEffect(() => {
  //     fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/year")
  //       .then((response) => response.text())
  //       // .then(str => new window.DOMParser().carparseFromString(str, "text/xml"))
  //       .then((xml) => new XMLParser().parseFromString(xml))
  //       .then((data) => {
  //         console.log(data.children.map((c) => c.children.map((v) => {
  //             return v.value
  //         })));
  //         setCarYears(data.children.map((c) => c.children.map((v) => v.value)));
  //       });
  //   }, []);

//   useEffect(() => {
//     fetch(
//       "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?ManufacturerType=Complete&format=json"
//     )
//       .then((r) => r.json())
//       .then((data) => {
//         setMakeNames(data.Results.map((name) => name.Mfr_Name));
//       });
//   }, []);

  const marks = [
    {
      value: 20,
      label: "20 MPG",
    },
    {
      value: 35,
      label: "35MPG",
    },
    {
      value: 100,
      label: "100 MPGe",
    },
  ];

  return (
    <Box
      sx={{
        // border: "2px solid black",
        height: "60vh",
        paddingLeft: "35%",
        paddingRight: "5%",
      }}
    >
      <h3> What is your Car's Average Fuel Economy?</h3>
      <Slider
        aria-label="Custom marks"
        size="medium"
        defaultValue={20}
        step={1}
        min={15}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e) => setMPG(e.target.value)}
      />
      <h3>How Many Miles Do You Drive Per Week</h3>
      <Slider
        aria-label="Custom marks"
        size="medium"
        defaultValue={70}
        step={1}
        valueLabelDisplay="auto"
        min={0}
        max={700}
        onChange={(e) => setMilesDriven(e.target.value)}
      />
      {/* <InputLabel id="year-label">Year</InputLabel>
        <NativeSelect
          id="year-select"
          value='1-25'
          label="Year"
          onChange={(e) => setCurrentYear(e.target.value)}
        >
          {for (let i = 2022; i >= 1985; i = i - 1) {
            return (
              <option value={i}>{i}</option>
              )
          }}
          {yearsFunc()}
        </NativeSelect> */}

      {/* <InputLabel id="car-make-label">Make</InputLabel>

        <NativeSelect
          id="car-make"
          value={currentMake}
          label="Make"
          onChange={(e) => setCurrentMake(e.target.value)}
        >
          {[...makeNames].map((make) => {
            return <option value={make}>{make}</option>;
          })}
        </NativeSelect> */}
      <Button 
      type="submit"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Transportation;

// Pounds of CO2 emitted per gallon 	18.74/gallon	lbs CO2/gallon -- https://www.eia.gov/environment/emissions/co2_vol_mass.php
// Ratio of emissions of greenhouse gases other than CO2 	1.01	lbCO2e/lbCO2
// Passenger Vehicle Fuel Economy	21.6	miles per gallon (mpg)
// Average miles traveled per year per vehicle	https://www.fhwa.dot.gov/ohim/onh00/bar8.htm	miles per year 13,476
// Average emissions for a typical vehicle	 10,484 	lbs CO2e/vehicle
// (1/21.6 mpg)*11,398 miles/year*19.6 lbs CO2/gallon*CO2e / CO2
