import React, { useState } from "react";
import Draggable from 'react-draggable';
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
    Button,
    makeStyles,
    MenuItem,
    Select,
    InputLabel
} from "@material-ui/core";

// Import support function
import conflictEvent from "../submitForm/supportFunction/conflictEvent";

/**
 * Datetime-picker: Provide calendar to select date & time.
 * Resource: https://material-ui-pickers.dev/demo/datetime-picker
 */
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

/**
 * Draggable: Enable to move dialog.
 * Resource: https://mui.com/components/dialogs/
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

/**
 * Prepares class styles.
 * @type {(props?: any) => ClassNameMap<"inputStyle"|"dialogTitle">}
 */
const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        textAlign: 'center',
        cursor: 'move'
    },
    inputStyle: {
        width: "600px",
        padding: "10px 10px 10px 0px",
        marginRight: "10px"
    }
}));

/**
 * Provides a button for adding calendar event.
 * @param rows The rows will be added on the calendar event.
 * @param events The original calendar events.
 * @param getCalenderList The function from calendar page.
 * @param showSnack The function from calendar page.
 * @returns {JSX.Element}
 * @constructor
 */
const AddCalendar = ({   rows,
                         events,
                         getCalenderList,
                         showSnack
}) => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const moment = require('moment');
    const [values, setValues] = useState({
        startDateTime: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        timing: rows.timing,
        scheduleProtocol: rows.scheduleProtocol_id,
        scanner: 1
    });

    /**
     * Handles schedule button event.
     * @param e
     */
    const handleClickSchedule = (e) => {
        setDialogOpen(true);
    }

    /**
     * Handles dialog close event.
     * @param e
     */
    const handleDialogClose = (e) => {
        setDialogOpen(false);
    }

    /**
     * Handles input change event.
     * @param e
     */
    const handleInputChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    /**
     * Handles date change event.
     * @param e
     */
    const handleDateChange = (e) => {
        setValues({
            ...values,
            startDateTime: moment(e).format('YYYY-MM-DDTHH:mm')
        });
    }

    /**
     * Handles submit button event.
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (conflictEvent(events, values).length > 0) {
            showSnack("Cannot schedule the event because the scanner has been occupied.", "error");
        } else {
            axios.post('api/auth/calendarEvents', values)
                .then(() => {
                    handleDialogClose();
                    getCalenderList();
                    showSnack("Schedule an event.", "success");
                });
        }
    }

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickSchedule}>
                Schedule
            </Button>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth='md'
            >
                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    Create Appointment
                </DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
                        <KeyboardDateTimePicker
                            value={values.startDateTime}
                            onChange={handleDateChange}
                            label="Select Date"
                            onError={console.log}
                            minDate={new Date()}
                        />
                    </MuiPickersUtilsProvider>
                    <InputLabel id="scanner-label">Scanner</InputLabel>
                    <Select
                        labelId="scanner-label"
                        id="scanner"
                        name="scanner"
                        onChange={handleInputChange}
                        value={values.scanner}
                        fullWidth
                        label="Scanner"
                    >
                        <MenuItem value={1}>Scanner #1</MenuItem>
                        <MenuItem value={2}>Scanner #2</MenuItem>
                    </Select>
                    <p>Patient Name:<br/><b>{rows.patientFirstName} {rows.patientLastName}</b></p>
                    <p>Exam Length:<br/><b>{rows.timing} minutes</b></p>
                    <p>Urgency:<br/><b>{rows.urgency}</b></p>
                    <p>Protocol:<br/><b>{rows.suggestedProtocol}</b></p>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={handleSubmit} size='large'>
                        Submit
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={handleDialogClose} size='large'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCalendar;