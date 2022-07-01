import React from "react";
import {useState} from 'react'
import ManipulateUser from './ManipulateUser'
import {
  Container,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const App = () => {
  
  const sampleUser = {
    username: null,
    first_name: null,
    last_name: null,
    phone: null,
    fax: '',
    role: 0,
    site: '',
    department: '',
  }

  const [alertFeedback, setAlertFeedback] = useState({ severity: "error", message: "This message should never display" })
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleOnSubmit = (values) => {
    axios.post('api/auth/usermanagement', values)
        .then(res => {
            setAlertFeedback({ severity: "success", message: "User has been created." })
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; 
    }

    setSnackbarOpen(false);
  };
  
  return (
    <Container maxWidth="md">
      <ManipulateUser initialUser={sampleUser} type="Add" onPost={values => handleOnSubmit(values)} />

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
