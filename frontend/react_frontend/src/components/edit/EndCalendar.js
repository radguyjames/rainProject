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
    makeStyles
} from "@material-ui/core";

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
 * Provides a button for ending calendar event.
 * @param suggestedProtocol
 * @param urgency
 * @param timing
 * @param patientFirstName
 * @param patientLastName
 * @param getCalenderList
 * @param calendarEvent_id
 * @param startDateTime
 * @param showSnack
 * @returns {JSX.Element}
 * @constructor
 */
const EndCalendar = ({   suggestedProtocol,
                         urgency,
                         timing,
                         patientFirstName,
                         patientLastName,
                         getCalenderList,
                         calendarEvent_id,
                         startDateTime,
                         showSnack
}) => {
    const classes = useStyles()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedDate, handleDateChange] = useState(new Date());

    /**
     * Handles complete button event.
     * @param e
     */
    const handleClickComplete = (e) => {
        handleDateChange(startDateTime);
        setDialogOpen(true)
    }

    /**
     * Handles dialog close event.
     * @param e
     */
    const handleDialogClose = (e) => {
        setDialogOpen(false);
    }

    /**
     * Handles submit button event.
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault()

        /**
         * Complete requisition form.
         * Steps:
         * 1. Post the entire completed data to another table to store as history reference.
         * 2. Delete entire completed data.
         * */
        axios.post('api/auth/finishProtocol', {
            calendarEvent_id: calendarEvent_id
        }).then(() => {
            handleDialogClose();
            showSnack("Remove completed event.", "success")

            // Fetches API in calendar page.
            getCalenderList();
        });
    }

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickComplete}>
                Complete
            </Button>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth='md'
            >
                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    Confirm Appointment
                </DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
                        <KeyboardDateTimePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            label="Select Date"
                            onError={console.log}
                            minDate={new Date()}
                            readOnly
                        />
                    </MuiPickersUtilsProvider>
                    <p>Patient Name:<br/><b>{patientFirstName} {patientLastName}</b></p>
                    <p>Exam Length:<br/><b>{timing} minutes</b></p>
                    <p>Urgency:<br/><b>{urgency}</b></p>
                    <p>Protocol:<br/><b>{suggestedProtocol}</b></p>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={handleSubmit} size='large'>
                        Confirm
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={handleDialogClose} size='large'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EndCalendar;