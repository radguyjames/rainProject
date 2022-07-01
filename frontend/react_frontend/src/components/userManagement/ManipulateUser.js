import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,
  ButtonGroup,
  Paper,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import axios from "axios";

//Code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt with minor alterations.
function isNumber(value) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return true
    } else {
      return false
    }
  }

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "30px 0px 30px 0px",
  },
  contentGrid: {
    width: '700px',
    margin: 'auto'
  },
  inputLabel: {
    padding: '6px 0 7px'
  },
  gridItem: {
    marginBottom: '20px'
  }
}));

const initialErrorState = {
    username : {error : false, helper : ""},
    firstName : {error : false, helper : ""},
    lastName : {error : false, helper : ""},
    phone : {error : false, helper : ""},
    fax : {error : false, helper : ""},
}

const App = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState(props.initialUser);
  const [errorState, setErrorState] = useState(initialErrorState)

  const handleCancel = (e) => {
    history.push("/apps/usermanagement");
  };

  const handleInputChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const handleSave = (e) => {
    if(evaluateErrors())
    {
        props.onPost(userDetails)
    }
  };

  const evaluateErrors = () => {
      let formValid = true
      setErrorState(initialErrorState)
      
      if(!userDetails.username)
      {
        setErrorState(prevState => {return {...prevState, username:{error:true, helper:"Username field cannot be blank"}}})
        formValid = false
      }

      if(!userDetails.first_name)
      {
        setErrorState(prevState => {return {...prevState, firstName:{error:true, helper:"First name field cannot be blank"}}})
        formValid = false
      }

      if(!userDetails.last_name)
      {
        setErrorState(prevState => {return {...prevState, lastName:{error:true, helper:"Last name field cannot be blank"}}})
        formValid = false
      }
      
      if(!userDetails.phone)
      {
        setErrorState(prevState => {return {...prevState, phone:{error:true, helper:"Phone number field cannot be blank"}}})
        formValid = false
      }
      else if(!isNumber(userDetails.phone))
      {
        setErrorState(prevState => {return {...prevState, phone:{error:true, helper:"Phone number field can only contain numbers"}}})
        formValid = false
      }
      else if(userDetails.phone.length > 10)
      {
        setErrorState(prevState => {return {...prevState, phone:{error:true, helper:"Phone number field can only be a maximum of 10 characters."}}})
        formValid = false
      }

      if(userDetails.fax && !isNumber(userDetails.fax))
      {
        setErrorState(prevState => {return {...prevState, fax:{error:true, helper:"Fax number field can only contain numbers or be blank"}}})
        formValid = false
      }
      else if(userDetails.fax.length > 10)
      {
        setErrorState(prevState => {return {...prevState, fax:{error:true, helper:"Fax number field can only be a maximum of 10 characters."}}})
        formValid = false
      }

      return formValid
  }

  return (
    <Container>
      <Typography align="center" variant="h5" className={classes.title}>
        {props.type == "Edit" ? `Editing User` : `Adding New User`}
      </Typography>

      <Paper style={{ padding: '50px 0px', marginBottom: '50px' }}>
        <Grid container className={classes.contentGrid} spacing={3}>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField id="username" name="username" label="Username" error={errorState.username.error} helperText={errorState.username.helper} fullWidth value={userDetails.username} onChange={handleInputChange} variant="outlined" />
          </Grid>
          
          <Grid item xs={6} className={classes.gridItem}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select name='role' labelid="role-label" value={userDetails.role} onChange={handleInputChange} fullWidth>
                <MenuItem value={-2}>Admin</MenuItem>
                <MenuItem value={0}>Physician</MenuItem>
                <MenuItem value={1}>Clerk</MenuItem>
                <MenuItem value={2}>Radiologist</MenuItem>
                <MenuItem value={3}>Technologist</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField label="First Name" id="first_name" name="first_name" error={errorState.firstName.error} helperText={errorState.firstName.helper} value={userDetails.first_name} onChange={handleInputChange} variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField label="Last Name" id="last_name" name="last_name" error={errorState.lastName.error} helperText={errorState.lastName.helper} value={userDetails.last_name} onChange={handleInputChange}  variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField label="Phone" id="phone" name="phone" error={errorState.phone.error} helperText={errorState.phone.helper} value={userDetails.phone} onChange={handleInputChange} variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField label="Fax" id="fax" name="fax" error={errorState.fax.error} helperText={errorState.fax.helper} value={userDetails.fax} onChange={handleInputChange} variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField label="Site" id="site" name="site" value={userDetails.site} onChange={handleInputChange} variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField label="Department" id="department" name="department" value={userDetails.department} onChange={handleInputChange} variant="outlined" fullWidth />
          </Grid>
          
          <Grid item xs={4}>
            <ButtonGroup size="small" variant="contained">
              <Button onClick={handleSave} color='primary'>{props.type == "Edit" ? "Save Changes" : "Add User"}</Button>
              <Button onClick={handleCancel} color='secondary'>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>

    </Container>
  );
};

export default App;