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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "30px 0px 30px 0px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  nameField: {
    width: '241px',
    paddingLeft: '41px'
  },
  typeField: {
    width: '120px',
    marginLeft: '41px'
  },
  pointField: {
    width: '71px',
    paddingLeft: '41px'
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

const App = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [mobilityRequirement, setMobilityRequirement] = useState(props.initialMobilityRequirement);
  const [titleOption, setTitleOption] = useState(false);
  const [mobilityRequirementMessage, setMobilityRequirementMessage] = useState("");

  useEffect(() => {
    setTitleOption(mobilityRequirement.mobilityRequirement);
  }, [])

  const handleMobilityRequirementChange = (e) => {
    setMobilityRequirement({ ...mobilityRequirement, mobilityRequirement: e.target.value })
  }

  const handleCancel = (e) => {
    history.push("/apps/edit/mobilityrequirements");
  };

  // Validation
  const handleSave = (e) => {
    let errors = 0;

    if (!mobilityRequirement.mobilityRequirement) {
      setMobilityRequirementMessage("Required");
      errors++;
    }

    if (mobilityRequirement.mobilityRequirement.length > 200) {
      setMobilityRequirementMessage("Cannot exceed 200 characters");
      errors++;
    }

    if (errors === 0) {
      props.onPost(mobilityRequirement);
    }
  };

  // Enables enter key
  // useEffect(() => {
  //   function handleKeyDown(e) {
  //     if (e.keyCode === 13) {
  //       handleSave();
  //     }
  //   }

  //   document.addEventListener('keydown', handleKeyDown);

  //   return function cleanup() {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   }
  // }, []);

  return (
    <Container>
      <Paper style={{ paddingBottom: '50px', marginBottom: '50px', marginTop: '24px' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: '#64B5F6',
            marginBottom: '40px',
            height: '100px',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px'
          }}>
          <h1
            style={{ margin: 'auto' }}
          >
            {props.type === "Edit" ? `Edit Mobility Option: ${titleOption}` : `Create Mobility Option`}
          </h1>
        </div>

        <Grid container className={classes.contentGrid}>
          <Grid item xs={3} className={classes.gridItem}>
            <Typography className={classes.inputLabel}>Mobility Option:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            <TextField
              autoFocus
              fullWidth
              id="mobility_requirement"
              value={mobilityRequirement.mobilityRequirement}
              onChange={handleMobilityRequirementChange}
              error={mobilityRequirementMessage !== ""}
              helperText={mobilityRequirementMessage}
            />
          </Grid>
          <Grid item xs={4} style={{ textAlign: "left" }}>
            <ButtonGroup size="small" variant="contained" style={{ marginTop: '20px' }}>
              <Button onClick={handleSave} color='primary'>{props.type === "Edit" ? "Save" : "Create"}</Button>
              <Button onClick={handleCancel} color='secondary'>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
