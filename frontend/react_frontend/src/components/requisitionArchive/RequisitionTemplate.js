import React from "react";
import { withStyles } from "@material-ui/styles";
import {
  TextField,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  Container,
} from "@material-ui/core";

const DarkerDisabledTextField = withStyles({
  root: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
    }
  }
})(TextField);

const App = (props) => {
  return (
    <Container maxWidth="md" style={{ padding: 0 }}>
      <Paper style={{ padding: 16 }}>
        <Grid container xs={12} alignItems="flex-start" spacing={2}>
          <Grid item xs={12} sm={6}>
            <DarkerDisabledTextField
              label="Patient First Name"
              fullWidth
              value={props.requisition.patientFirstName}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DarkerDisabledTextField
              label="Patient Last Name"
              fullWidth
              value={props.requisition.patientLastName}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DarkerDisabledTextField
              label="PHIN"
              fullWidth
              value={props.requisition.phin}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DarkerDisabledTextField
              label="Isolation Precautions"
              fullWidth
              value={props.requisition.precaution}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DarkerDisabledTextField
              label="Ward"
              fullWidth
              value={props.requisition.ward}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DarkerDisabledTextField
              label="Weight"
              fullWidth
              value={props.requisition.weight}
              disabled
            ></DarkerDisabledTextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DarkerDisabledTextField
              label="Height"
              fullWidth
              value={props.requisition.height}
              disabled
            ></DarkerDisabledTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DarkerDisabledTextField
              label="Physician"
              fullWidth
              value={props.requisition.clinician}
              disabled
            ></DarkerDisabledTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DarkerDisabledTextField
              label="Date of Birth"
              fullWidth
              value={props.requisition.dob}
              disabled
            ></DarkerDisabledTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel labelPlacement="start">Gender</FormLabel>
              <RadioGroup
                row
                id="gender"
                name="gender"
                defaultChecked={true}
                value={props.requisition.gender}
                disabled
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <DarkerDisabledTextField
              label="Relevant Clinical History"
              fullWidth
              value={props.requisition.clinicalInformation}
              disabled
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DarkerDisabledTextField
              label="Anatomical Location"
              fullWidth
              value={props.requisition.anatomicalLocation}
              disabled
            ></DarkerDisabledTextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DarkerDisabledTextField
              label="Sub-Location"
              fullWidth
              value={props.requisition.subLocation}
              disabled
            ></DarkerDisabledTextField>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormLabel labelPlacement="start">Urgency</FormLabel>
            <RadioGroup
              row
              id="urgency"
              name="urgency"
              value={props.requisition.urgency}
              style={{ marginBottom: 0 }}
              disabled
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
            </RadioGroup>
            <p style={{ margin: 0 }}>
              <small>
                <b>1 -</b> (2-3 hours) <b>2 -</b> (24 hours) <b>3 -</b> (24-72
                hours) <b>4 -</b> (2 Weeks)
              </small>
            </p>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
