import React, { useState } from "react";
import { useHistory } from "react-router";

import { Input, InputLabel, Select, MenuItem, Button, Container, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  SearchButtons: {
    margin: "30px 0px 0px 0px"
  },
}))

//This function will alter the day of a date object by changeDays number of days.
const alterDateDay = (date, changeDays) => {
  date.setDate(date.getDate() + changeDays);
  return date;
}

const Search = () => {
  const history = useHistory();
  
  const [part, setPart] = useState('Any');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fromDate, setFromDate] = useState(alterDateDay(new Date(), -7).toISOString().slice(0, 10))
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10))
  
  const updateSelect = (e) => {
    setPart(e.target.value);
  };

  const updateFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const updateToDate = (e) => {
    setToDate(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault()
    let searchData = {
      patientFirstName : firstName,
      patientLastName : lastName,
      anatomicalLocation : part,
      startDate : fromDate,
      endDate : toDate
    }

    //This statement will redirect the page to Archive.js and send the searchData as a prop.
    history.push({
      pathname : "/apps/archive",
      state: {detail: searchData}
    })
  }
  
  const container = {
    width: "50%",
    minWidth: "600px",
    height: "350px",
    margin: "20px auto",
    padding: "20px 0px 20px 100px",
  }

  const classes = useStyles();


  return (
    <Container maxWidth="md">
      <div className="heading" style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <h1 style={{
          margin: "20px auto",
          padding: "5px 100px",
          borderRadius: "10px"
        }}>Search Requisitions</h1>
      </div>
      <Paper style={container}>
        <InputLabel className="inputLabel" style={{
          width: "600px",
          padding: "10px 10px 10px 0px", marginRight: "10px"
        }}>
          Patient First Name:
          <Input type="text" className="input" onChange={updateFirstName} value={firstName} Style={{ padding: "0 20px" }} />
        </InputLabel>
        <InputLabel className="inputLabel" style={{
          width: "600px",
          padding: "10px 10px 10px 0px", marginRight: "10px"
        }}>
          Patient Last Name:
          <Input type="text" className="input" onChange={updateLastName} value={lastName} Style={{ padding: "0 20px" }} />
        </InputLabel>
        <br />
        <InputLabel className="inputLabel" style={{
          width: "600px",
          padding: "10px 10px 10px 0px", marginRight: "10px", marginBottom: "15px"
        }} >
          <span> Date:</span>
          <Input className="input" name="start " type="date" onChange={updateFromDate} value={fromDate} Style={{ padding: "0 20px" }} />
          <span> To:</span>
          <Input name="end" type="date" onChange={updateToDate} value={toDate} Style={{ padding: "0 20px" }} />
        </InputLabel>

        <InputLabel className="inputLabel" Style={{padding: "10px 10px 10px 0px"}}>
          Anatomical Location:
          <Select value={part} onChange={updateSelect}>
            <MenuItem value={"Any"}>Any</MenuItem>
            <MenuItem value={"Abdomen"}>Abdomen</MenuItem>
            <MenuItem value={"MSK"}>MSK</MenuItem>
            <MenuItem value={"Neuro"}>Neuro</MenuItem>
            <MenuItem value={"Spine"}>Spine</MenuItem>
          </Select>
        </InputLabel>
        <div className={classes.SearchButtons}>
          <Button className="abc" variant="outlined" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Search;
