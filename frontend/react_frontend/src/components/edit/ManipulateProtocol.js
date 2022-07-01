import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
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
  MenuItem
} from "@material-ui/core";
import VariableTextList from './VariableTextList'
import SequenceSelector from './SequenceSelector'
import KeywordSelector from './KeywordSelector'
import ExamCodeSelector from './ExamCodeSelector'

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
  timeField: {
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

  const [protocolDetails, setProtocolDetails] = useState(props.initialProtocol);
  const [types, setTypes] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [examCodes, setExamCodes] = useState([]);
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [title, setTitle] = useState("");

  const [isSequenceLoading, setIsSequenceLoading] = useState(true);
  const [isKeywordLoading, setIsKeywordLoading] = useState(true);
  const [isExamCodeLoading, setIsExamCodeLoading] = useState(true);

  const [protocolMessage, setProtocolMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  // Initial data population
  useEffect(() => {
    setTitle(protocolDetails.protocol);
    axios.get("http://127.0.0.1:8000/api/auth/types")
      .then(res => {
        setTypes(res.data.objType);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get("http://127.0.0.1:8000/api/auth/sequences")
      .then(res => {
        setSequences(res.data.objSequence, setIsSequenceLoading(false));
      })
      .catch(err => {
        console.log(err);
      })

    axios.get("http://127.0.0.1:8000/api/auth/keywords")
      .then(res => {
        setKeywords(res.data.objKeywords, setIsKeywordLoading(false));
      })
      .catch(err => {
        console.log(err);
      })

    axios.get("http://127.0.0.1:8000/api/auth/examcodes")
      .then(res => {
        setExamCodes(res.data.objExamCode, setIsExamCodeLoading(false));
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  // Filter keyword selection pool based on selected type
  useEffect(() => {
    let acc = [];

    if (!isKeywordLoading) {
      for (let i of keywords) {
        if (i.type === protocolDetails.type) {
          acc.push(i);
        }
      }
    }

    setFilteredKeywords(acc);
  }, [protocolDetails.type, keywords])

  // 
  const handleNameChange = (e) => {
    setProtocolDetails({ ...protocolDetails, protocol: e.target.value })
  }

  // 
  const handleExamTimeChange = (e) => {
    setProtocolDetails({ ...protocolDetails, examTime: e.target.value })
  }

  // 
  const handleTypeChange = (e) => {
    setProtocolDetails({ ...protocolDetails, type: e.target.value, keywords: [] })
  }

  // 
  const handleCancel = (e) => {
    history.push("/apps/edit/protocols");
  };

  // 
  const handleSave = (e) => {
    let errors = 0;

    if (!protocolDetails.protocol) {
      setProtocolMessage("Required");
      errors++;
    }

    if (protocolDetails.protocol.length > 200) {
      setProtocolMessage("Cannot exceed 200 characters");
      errors++
    }

    if (!protocolDetails.type) {
      setTypeMessage("Required");
      errors++;
    }

    if (errors === 0) {
      props.onPost(protocolDetails);
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
            {props.type === "Edit" ? `Edit Protocol: ${title}` : `Create Protocol`}
          </h1>
        </div>

        <Grid container className={classes.contentGrid}>
          <Grid item xs={3} className={classes.gridItem}>
            <Typography className={classes.inputLabel}>Protocol:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            <TextField
              autoFocus
              fullWidth
              id="protocol_name"
              value={protocolDetails.protocol}
              onChange={handleNameChange}
              error={protocolMessage !== ""}
              helperText={protocolMessage}
            />
          </Grid>

          <Grid item xs={3} className={classes.gridItem}>
            <Typography className={classes.inputLabel}>Type:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            <Select
              fullWidth
              value={protocolDetails.type}
              onChange={handleTypeChange}
              error={typeMessage !== ""}
              helperText={typeMessage}
            >
              {!types ? null :
                types.map(({ id, type }) => (
                  <MenuItem key={id} value={id}>{type}</MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item xs={3} className={classes.gridItem}>
            <Typography className={classes.inputLabel}>Exam Time:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            <TextField
              fullWidth
              id="exam_time"
              type="number"
              value={protocolDetails.examTime}
              onChange={handleExamTimeChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>

          <Grid item xs={3} className={classes.gridItem}>
            <Typography style={{ padding: '18px 0px' }}>Exam Codes:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            {!isExamCodeLoading &&
              <ExamCodeSelector
                itemList={protocolDetails.examCodes}
                listType={"Exam Code"}
                selectionPool={examCodes}
                onListChange={value => setProtocolDetails({ ...protocolDetails, examCodes: value })}
              />
            }
          </Grid>

          <Grid item xs={3} className={classes.gridItem}>
            <Typography style={{ padding: '18px 0px' }}>Sequences:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            {!isSequenceLoading &&
              <SequenceSelector
                itemList={protocolDetails.sequences}
                listType={"Sequence"}
                selectionPool={sequences}
                onListChange={e => setProtocolDetails({ ...protocolDetails, sequences: e })}
              />
            }
          </Grid>

          <Grid item xs={3} className={classes.gridItem}>
            <Typography style={{ padding: '18px 0px' }}>Keywords:</Typography>
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            {!isKeywordLoading &&
              <KeywordSelector
                key={protocolDetails.type}
                itemList={protocolDetails.keywords}
                listType={"Keyword"}
                selectionPool={filteredKeywords}
                onListChange={e => setProtocolDetails({ ...protocolDetails, keywords: e })}
              />
            }
          </Grid>

          <Grid item xs={4}>
            <ButtonGroup size="small" color="primary" style={{ marginTop: '20px' }}>
              <Button onClick={handleSave} variant='contained' color='primary'>{props.type === "Edit" ? "Save Changes" : "Add Protocol"}</Button>
              <Button onClick={handleCancel} variant='contained' color='secondary'>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
