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

  const [code, setCode] = useState(props.initialSequence);
  const [titleOption, setTitleOption] = useState(false);
  const [examCodeMessage, setExamCodeMessage] = useState("");

  useEffect(() => {
    setTitleOption(code.examCode);
  }, [])

  const handleSequenceChange = (e) => {
    setCode({ ...code, examCode: e.target.value });
  }

  const handleCancel = (e) => {
    history.push("/apps/edit/examcodes");
  }

  // Validation
  const handleSave = (e) => {
    let errors = 0;

    if (!code.examCode) {
      setExamCodeMessage("Required");
      errors++;
    }

    if (code.examCode.length > 50) {
      setExamCodeMessage("Cannot exceed 50 characters");
      errors++;
    }

    if (errors === 0) {
      props.onPost(code);
    }
  }

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
            {props.type === "Edit" ? `Edit Exam Code: ${titleOption}` : `Create Exam Code`}
          </h1>
        </div>

        <Grid container className={classes.contentGrid}>
          <Grid item xs={3} className={classes.gridItem}>
            <Typography className={classes.inputLabel}>Exam Code:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            <TextField
              autoFocus
              fullWidth
              value={code.examCode}
              onChange={handleSequenceChange}
              error={examCodeMessage !== ""}
              helperText={examCodeMessage}
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
