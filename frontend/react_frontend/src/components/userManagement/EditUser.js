import React, {useState} from "react";
import ManipulateUser from './ManipulateUser'
import {
  Container,
  Snackbar
} from "@material-ui/core";
import axios from 'axios'
import { useLocation } from "react-router";
import Alert from "@material-ui/lab/Alert";

const App = () => {
  
  const location = useLocation()

  const [alertFeedback, setAlertFeedback] = useState({ severity: "error", message: "This message should never display" })
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const sampleUser = {
    id: (location.state ? location.state.detail.id : null),
    username: (location.state ? location.state.detail.username : null),
    first_name: (location.state ? location.state.detail.first_name : null),
    last_name: (location.state ? location.state.detail.last_name : null),
    phone: (location.state ? location.state.detail.phone : null),
    fax: (location.state ? location.state.detail.fax : null),
    role: (location.state ? location.state.detail.role : 0),
    site: (location.state ? location.state.detail.site : null),
    department: (location.state ? location.state.detail.department : null),
  }
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; 
    }

    setSnackbarOpen(false);
  };
  
  const handleOnPut = (values) => {
    axios.put('api/auth/usermanagement', values)
        .then(res => {
            setAlertFeedback({ severity: "success", message: "User has been edited." })
            setSnackbarOpen(true)
        }).catch((error) => {
            if(error.response.data.username)
            {
              setAlertFeedback({ severity: "error", message: "The username you have chosen already exists." })
            }
            else
            {
              setAlertFeedback({ severity: "error", message: error.message })
            }
            setSnackbarOpen(true)
        })
  }  

  return (
    <Container maxWidth="md">
      <ManipulateUser initialUser={sampleUser} type="Edit" onPost={values => handleOnPut(values)}/>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertFeedback.severity} variant="filled">
          {alertFeedback.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
