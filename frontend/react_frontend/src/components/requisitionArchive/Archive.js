import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import * as htmlToImage from 'html-to-image';
import RequisitionTemplate from "./RequisitionTemplate"
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

//This object is used as the initial requisition that fills the requisition prop in the RequisitionTemplate. It will be replaced by the target requisition when it is chosen.
const sampleRequisition = {
  anatomicalLocation: "Neuro",
  clinicalInformation: "ERROR: You shouldn't be seeing this!",
  clinician: "Doctor",
  dateCreated: "05/31/2021 12:06:06",
  dob: "2000-12-12",
  feedback: "",
  gender: "male",
  height: "173 cm",
  id: 4,
  patientFirstName: "Radovan",
  patientLastName: "Ayahuasca",
  phin: "167677677",
  precaution: "Airborne",
  subLocation: "Brain",
  urgency: "1",
  ward: "A3 - 73731",
  weight: "80 kg",
}

const useStyles = makeStyles((theme) => ({
  query_result: {
    margin: "100px 0px 25px 0px",
  },
  form: {
    marginTop: "15px",
  },
  table_header: {
    fontWeight: "bold",
  },
  selectLabel: {
    fontSize: "12px",
    marginRight: "45px"
  },
  dialogTitle: {
    textAlign: "center"
  }
}));

const App = () => {
  
  //This useLocation() hook allows us to receive props from the Search.js page when it redirects to this page.
  const location = useLocation()

  const [patientFirstName, setPatientFirstName] = useState(typeof location.state !== 'undefined' ? location.state.detail.patientFirstName : '');
  const [patientLastName, setPatientLastName] = useState(typeof location.state !== 'undefined' ? location.state.detail.patientLastName : '');
  const [fromDate, setFromDate] = useState(typeof location.state !== 'undefined' ? location.state.detail.startDate : new Date().toISOString().slice(0, 10));
  const [toDate, setToDate] = useState(typeof location.state !== 'undefined' ? location.state.detail.endDate : new Date().toISOString().slice(0, 10));
  const [anatomicalLocation, setAnatomicalLocation] = useState(typeof location.state !== 'undefined' ? location.state.detail.anatomicalLocation : 'Any')
  const [requisitions, setRequisitions] = useState([]);
  const [targetRequisition, setTargetRequisition] = useState(sampleRequisition)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOnSubmit = (e) => {
    
    e.preventDefault();
    searchRequistions()
  };

  const handleFirstNameChange = (e) => {
    setPatientFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setPatientLastName(e.target.value);
  };

  const handleFromChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToChange = (e) => {
    setToDate(e.target.value);
  };

  const handleAnatomicalChange = (e) => {
    setAnatomicalLocation(e.target.value)
  }

  
  //Sends an API request to the backend for requisitions.
  const searchRequistions = () => {
    
    //The following lines of code set the "from date" to have a time set to 0:00:00,
    //and the "to date" to have time set to 23:59:59
    let newToDate = new Date(toDate)
    let newFromDate = new Date(fromDate)
    newToDate.setUTCHours(23)
    newToDate.setUTCMinutes(59)
    newToDate.setUTCSeconds(59)
    newToDate.setUTCMilliseconds(999)

    axios.get('http://localhost:8000/api/auth/archive', {
      params:
      {
        firstName: patientFirstName,
        lastName: patientLastName,
        startDate: newFromDate,
        endDate: newToDate,
        anatomicalLocation: anatomicalLocation
      }
    })
      .then(res => {
        setRequisitions(res.data.objRequisition)
      })
      .catch(err => {
        console.log(err)
      })

    //   axios.post('http://localhost:8000/api/auth/archive', searchTerms)
    //   .then(res => {
    //     console.log(res.data.objRequisition)
    //     setRequisitions(res.data.objRequisition)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  const handlePreview = e => {
    let downloadId = Number(e.currentTarget.id)
    let chosenRequisition = {}
    for (let requisition in requisitions) {
      if (requisitions[requisition].id === downloadId) {
        chosenRequisition = requisitions[requisition]
      }
    }
    setTargetRequisition(chosenRequisition)
    setDialogOpen(true)
  }

  //Utilizes the "html-to-image" library to basically screenshot the RequisitionTemplate component as a jpeg.
  const handleDownload = (e) => {
    htmlToImage.toJpeg(document.getElementById('TargetRequisition'))
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'Requisition' + targetRequisition.id + '.jpeg';
        link.href = dataUrl;
        link.click();
  });
  }

  const handleDialogClose = (e) => {
    setDialogOpen(false);
  };

  //Ensures searchRequisitions function runs on page load.
  useEffect(() => {
    searchRequistions()
  }, [])

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <form onSubmit={handleOnSubmit} className={classes.form}>
        <Grid container justify="center" alignItems="center">
          <Grid item container xs={2} justify="center">
            <InputLabel id="anatomical-location-label" className={classes.selectLabel}>Anatomical Location</InputLabel>
            <Select
              required
              labelId="anatomical-location-label"
              id="anatomicalLocation"
              name="anatomicalLocation"
              fullWidth
              onChange={handleAnatomicalChange}
              value={anatomicalLocation}
            >
              <MenuItem value={"Any"}>Any</MenuItem>
              <MenuItem value={"Abdomen"}>Abdomen</MenuItem>
              <MenuItem value={"Neuro"}>Neuro</MenuItem>
              <MenuItem value={"MSK"}>MSK</MenuItem>
              <MenuItem value={"Spine"}>Spine</MenuItem>
            </Select>
          </Grid>
          <Grid item container xs={3} justify="center">
            <TextField
              id="patient_first_name"
              label="Patient First Name"
              value={patientFirstName}
              onChange={handleFirstNameChange}
            />
          </Grid>
          <Grid item container xs={3} justify="center">
            <TextField
              id="patient_last_name"
              label="Patient Last Name"
              value={patientLastName}
              onChange={handleLastNameChange}
            />
          </Grid>
          <Grid item container xs={3} justify="center">
            <TextField
              id="from_date"
              label="From Date"
              type="date"
              value={fromDate}
              onChange={handleFromChange}
            />
          </Grid>
          <Grid item container xs={3} justify="center">
            <TextField
              id="to_date"
              label="To Date"
              type="date"
              value={toDate}
              onChange={handleToChange}
            />
          </Grid>
          <Grid item container xs={1} justify="center">
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        className={classes.query_result}
      >
        {requisitions.length} Results Found
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.table_header}>
                Anatomical Location
              </TableCell>
              <TableCell align="center" className={classes.table_header}>
                Patient First Name
              </TableCell>
              <TableCell align="center" className={classes.table_header}>
                Patient Last Name
              </TableCell>
              <TableCell align="center" className={classes.table_header}>
                Requisition Date
              </TableCell>
              <TableCell align="center" className={classes.table_header}>
                Download Link
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requisitions.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="center">{item.anatomicalLocation}</TableCell>
                <TableCell align="center">{item.patientFirstName}</TableCell>
                <TableCell align="center">{item.patientLastName}</TableCell>
                <TableCell align="center">{item.dateCreated}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" id={item.id} onClick={handlePreview}>
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth='md'>
        <DialogTitle className={classes.dialogTitle}>Viewing Requisition For <b>{targetRequisition.patientFirstName} {targetRequisition.patientLastName}</b> on <b>{targetRequisition.dateCreated.slice(0, 10)}</b></DialogTitle>
        <DialogContent>
        <div id={"TargetRequisition"}>
          <RequisitionTemplate requisition={targetRequisition}></RequisitionTemplate>
        </div>      
          <DialogActions>
            <Button color="primary" variant="outlined" onClick={handleDownload} size='large'>
              Download
            </Button>
            <Button color="secondary" variant="outlined" onClick={handleDialogClose} size='large'>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

    </Container>
  );
};

export default App;