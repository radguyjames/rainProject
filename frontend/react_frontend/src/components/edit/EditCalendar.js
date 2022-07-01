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
import MomentUtils from "@date-io/moment";

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
 * @type {(props?: any) => ClassNameMap<"editButton"|"divStyle"|"dialogTitle">}
 */
const useStyles = makeStyles((theme) => ({
    divStyle: {
        display: 'inline'
    },
    dialogTitle: {
        textAlign: 'center',
        cursor: 'move'
    },
    editButton: {
        padding: '6px 0px 0px 0px',
        margin: '-31px 10px -29px -5px',
        fontSize: '0.70rem'
    }
}));

/**
 * Generates a popup button for editing calendar event date.
 * @param selectedEventValues The selected event values will be changed event time.
 * @param setSelectedEventValues The set selected event values function from calendar page.
 * @param events The original calendar events.
 * @param onEventUpdated The setup event function from the calendar.
 * @param showSnack The function from calendar page.
 * @returns {JSX.Element}
 * @constructor
 */
const EditCalendar = ({   selectedEventValues,
                          setSelectedEventValues,
                          events,
                          onEventUpdated,
                          showSnack
}) => {
    let cloak = true;

    /**
     * Detectives whether an event has been selected.
     */
    if (selectedEventValues) cloak = !cloak;

    const classes = useStyles()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedDate, handleDateChange] = useState(new Date());
    const moment = require('moment');
    const values = {
        scheduleProtocol: selectedEventValues.scheduleProtocol_id,
        startDateTime: moment(selectedDate).format('YYYY-MM-DDTHH:mm'),
        timing: selectedEventValues.timing,
        scanner: selectedEventValues.scanner
    }

    /**
     * Determines the event id is matched.
     * @param event The events.
     * @returns {boolean}
     */
    const isMatchID = (event) => event.scheduleProtocol_id === selectedEventValues.scheduleProtocol_id;

    /**
     * Handles edit button event.
     * @param e
     */
    const handleClickEdit = (e) => {
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
     * Handles update button event.
     * @param e
     */
    const handleUpdate = (e) => {
        e.preventDefault();

        // Ignores the current event self before checking the conflict event list.
        const filterEvents = [...events];
        filterEvents.splice(filterEvents.findIndex(isMatchID), 1);

        if (conflictEvent(filterEvents, values).length > 0) {
            showSnack("Cannot schedule the event because the scanner has been occupied.", "error")
        } else {
            axios.put('api/auth/calendarEvents', values)
                .then(() => {
                    handleDialogClose();

                    // Makes a copy of event list to update calendar event.
                    // Reduces network request to avoid frequently using API.
                    const eventsClone = [...events];
                    const updatedEventIndex = eventsClone.findIndex(isMatchID);

                    if (updatedEventIndex > -1) {
                        const updatedEvent = eventsClone[updatedEventIndex];

                        updatedEvent.start = new Date(values.startDateTime);
                        updatedEvent.end = new Date(moment(values.startDateTime).add(values.timing, 'm').toDate());
                        updatedEvent.timing = values.timing;

                        eventsClone[updatedEventIndex] = updatedEvent;
                        onEventUpdated(eventsClone);
                        setSelectedEventValues({
                            ...selectedEventValues,
                            "start": new Date(moment(selectedDate).format('YYYY-MM-DDTHH:mm'))
                        });
                    }

                    showSnack("Update scheduled event.", "success");
                });
        }
    }

    return (
        <div className={classes.divStyle}>
            <Button disabled={cloak} className={classes.editButton} variant="contained" color="primary" onClick={handleClickEdit}>
                Edit
            </Button>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth='md'
            >
                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    Viewing Calendar Event
                </DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
                        <KeyboardDateTimePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            label="Select Date"
                            onError={console.log}
                            minDate={new Date()}
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={handleUpdate} size='large'>
                        Update
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={handleDialogClose} size='large'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCalendar;