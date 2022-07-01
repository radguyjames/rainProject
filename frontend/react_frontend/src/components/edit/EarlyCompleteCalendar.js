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
import moment from "moment";

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
    divStyle: {
        display: 'inline'
    },
    dialogTitle: {
        textAlign: 'center',
        cursor: 'move'
    },
    completeButton: {
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        padding: '6px 10px 0px 10px',
        fontSize: '0.70rem'
    }
}));

/**
 * Provides a button for early completing calendar event.
 * @param rows The rows will be early completed or uncompleted.
 * @param selectedEventValues The selected event values will be early completed or uncompleted.
 * @param setSelectedEventValues The set selected event values function from calendar page.
 * @param events The original calendar events.
 * @param onEventUpdated The setup event function from the calendar.
 * @param displayMessage The function from calendar page.
 * @param showSnack The function from calendar page.
 * @returns {JSX.Element}
 * @constructor
 */
const EarlyCompleteCalendar = ({   rows,
                                   selectedEventValues,
                                   setSelectedEventValues,
                                   events,
                                   onEventUpdated,
                                   displayMessage,
                                   showSnack
}) => {
    let cloak = true;

    /**
     * Detectives whether an event has been selected.
     */
    if (selectedEventValues) cloak = !cloak;

    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [dialogOpen, setDialogOpen] = useState(false);

    /**
     * Determines the event id is matched.
     * @param event The events.
     * @returns {boolean}
     */
    const isMatchID = (event) => event.scheduleProtocol_id === selectedEventValues.scheduleProtocol_id;

    /**
     * Handles complete button event.
     * @param e
     */
    const handleClickComplete = (e) => {
        handleDateChange(selectedEventValues.start);
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
     * Handles submit button event.
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        /**
         * Marks calendar event has been completed earlier.
         * */
        axios.put('api/auth/earlyCompleteCalendarEvent', {
            calendarEvent_id: selectedEventValues.calendarEvent_id,
            earlyComplete: !selectedEventValues.earlyComplete
        }).then(() => {
            handleDialogClose();

            // Makes a copy of event list to update calendar event.
            // Reduces network request to avoid frequently using API.
            const eventsClone = [...events];
            const updatedEventIndex = eventsClone.findIndex(isMatchID);

            if (updatedEventIndex > -1) {
                const updatedEvent = eventsClone[updatedEventIndex];

                updatedEvent.earlyComplete = !selectedEventValues.earlyComplete;

                eventsClone[updatedEventIndex] = updatedEvent;
                onEventUpdated(eventsClone);
                setSelectedEventValues({
                    ...selectedEventValues,
                    "earlyComplete": !selectedEventValues.earlyComplete
                });
            }

            selectedEventValues.earlyComplete === false ? showSnack("Early completed event.", "success") :
                showSnack("Dismiss early completed event.", "success");
        });
    }

    return (
        <div className={classes.divStyle}>
            <Button disabled={cloak} className={classes.completeButton} variant="contained" color="primary" onClick={handleClickComplete}>
                {displayMessage}
            </Button>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth='md'
            >
                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    {displayMessage} Appointment
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
                    <p>Patient Name:<br/><b>{rows.patientFirstName} {rows.patientLastName}</b></p>
                    <p>Exam Length:<br/><b>{selectedEventValues.timing} minutes</b></p>
                    <p>Urgency:<br/><b>{rows.urgency}</b></p>
                    <p>Protocol:<br/><b>{rows.suggestedProtocol}</b></p>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={handleSubmit} size='large'>
                        {displayMessage}
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={handleDialogClose} size='large'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EarlyCompleteCalendar;