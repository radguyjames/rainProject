import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router";
import axios from 'axios'

import SequenceSelector from '../edit/SequenceSelector'
import ProtocolSelector from '../edit/ProtocolSelector'

//  Material UI Styles
import {
  FormControl,
  TextField,
  Grid,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  Button,
  Typography,
  ButtonGroup,
  Container,
  makeStyles,
  createStyles
} from '@material-ui/core'

/**
 * This function returns the Protocol Update page.
 * @returns {JSX.Element}
 * @constructor
 */
export const Update = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = makeStyles();

  const [protocols, setProtocols] = useState();                                   // All protocols loaded from DB
  const [sequences, setSequences] = useState();                                   // All sequences loaded from DB
  const [values, setValues] = useState();                                         // Values to update. Passed from worklist and parsed to API format

  // Parse passed data into useable format
  useEffect(() => {
    let newSequences = [];
    let newProtocols = [];

    location.state.detail.sequences.forEach(sequence => {
      newSequences.push(sequence.sequenceID);
    })

    location.state.detail.suggestedProtocol.forEach(protocol => {
      newProtocols.push(protocol.ProtocolID);
    })

    setValues(
      {
        approvalLevel: location.state.detail.approvalLevel,
        clinicalInformation: location.state.detail.customRequisition.clinicalInformation,
        scheduleProtocol_id: location.state.detail.id,
        suggestedProtocol: newProtocols,
        timing: location.state.detail.timing,
        urgency: location.state.detail.customRequisition.urgency,
        priority: location.state.detail.customRequisition.priority,
        sequences: newSequences,
        feedback: location.state.detail.customRequisition.feedback
      }
    )
  }, [])

  // Get selector data from DB
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/auth/protocols")
      .then(res => {
        setProtocols(res.data.objProtocols);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get("http://127.0.0.1:8000/api/auth/sequences")
      .then(res => {
        setSequences(res.data.objSequence);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  /**
   * Gets sequences.
   * @returns {*|*[]}
   */
  const getItemList = () => {
    return values.sequences ? values.sequences.split(", ") : []
  }

  /**
   * Handles Input values for TextFields and Radiobuttons.
   * @param e
   */
  const handleInputChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  /**
   * Handles the data submitted to the form to our django backend.
   * @param e
   */
  const handleOnSubmit = e => {
    e.preventDefault()

    axios.put('api/auth/scheduleProtocol', values)
      .then(res => {
        history.push({
          pathname: '/apps/protocolmanagement',
          state: {
            detail: {
              message: "Updated protocol.",
              severity: "success"
            }
          }
        })
      })
  }

  const handleCancel = () => {
    history.push({
      pathname: '/apps/protocolmanagement'
    })
  }

  /**
   * Gets the suggested protocol data from the location state.
   */
  useEffect(() => {
    if (typeof location.state === 'undefined') {
      history.push('/apps/protocolmanagement')
    }
  }, [])

  return (
    <Container>
      <div style={{ padding: "24px", margin: 'auto', maxWidth: 800 }}>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: '#64B5F6',
            height: '100px',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px'
          }}>
          <h1
            style={{ margin: 'auto' }}
          >
            Edit Requisition
          </h1>
        </div>

        <form onSubmit={handleOnSubmit} autocomplete="off" encType="multi" style={{ marginBottom: 48 }}>
          <Paper style={{ padding: "16px" }}>
            {values &&
              <Grid container style={{ margin: "0" }} alignItems="flex-start" xs={12} spacing={2}>
                <Grid item xs={12}>
                  {protocols &&
                    <ProtocolSelector
                      itemList={values.suggestedProtocol}
                      listType={"Protocol"}
                      selectionPool={protocols}
                      onListChange={e => setValues({ ...values, suggestedProtocol: e })}
                    />
                  }
                </Grid>
                <Grid item xs={12}>
                  {sequences &&
                    <SequenceSelector
                      itemList={values.sequences}
                      listType={"Sequence"}
                      selectionPool={sequences}
                      onListChange={e => setValues({ ...values, sequences: e })}
                    />
                  }
                </Grid>
                <Grid item xs={6}>
                  <FormLabel labelPlacement="start"><small>Urgency</small></FormLabel>
                  <RadioGroup
                    row
                    required
                    id="urgency"
                    name="urgency"
                    value={parseInt(values.urgency)}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value={1} control={<Radio />} label='1' />
                    <FormControlLabel value={2} control={<Radio />} label='2' />
                    <FormControlLabel value={3} control={<Radio />} label='3' />
                    <FormControlLabel value={4} control={<Radio />} label='4' />
                  </RadioGroup>
                  <p style={{ margin: 0 }}><small><b>1</b> (2-3 hours) <b>2</b> (24 hours) <b>3</b> (24-72 hours) <b>4</b> (2 Weeks)</small></p>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    row
                    required
                    fullWidth
                    id="priority"
                    name="priority"
                    label="Priority"
                    type="number"
                    value={values.priority}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { min: 1, max: 40 } }}
                  >
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="timing"
                    name="timing"
                    label="Timing"
                    fullWidth
                    type="number"
                    value={values.timing}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="clinicalInformation"
                    name="clinicalInformation"
                    label="Relevant Clinical History"
                    fullWidth
                    multiline={true}
                    value={values.clinicalInformation}
                    onChange={handleInputChange}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="feedback"
                    name="feedback"
                    label="Feedback"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xd={12} style={{ marginTop: "20px" }}>
                  <ButtonGroup variant="contained" size="small">
                    <Button color="primary" type="submit">Update</Button>
                    <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            }
          </Paper>
        </form>
      </div>
    </Container>
  )
}