import React, { useEffect, useState } from 'react';
import axios from 'axios'
import moment from 'moment'

//import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'

// Import requisition details
import requisitionList from './requisitionDetailList/requisitionDetail';
import collapseList from "./requisitionDetailList/collapseDetail";
import protocolList from "./requisitionDetailList/protocolDetail";

// Import support function
import formatProtocolArray from "./supportFunction/formatProtocolArray";
import formatCalendarArray from "./supportFunction/formatCalendarArray";
import formatCalendarEvent from "./supportFunction/formatCalendarEvent";
import indicateDate from "./supportFunction/indicateDate";
import protocolStyle from "./supportFunction/protocolStyle";

// Import calendar buttons
import AddCalendar from "../edit/AddCalendar";
import EditCalendar from '../edit/EditCalendar';
import EndCalendar from "../edit/EndCalendar";
import EarlyCompleteCalendar from "../edit/EarlyCompleteCalendar";

//  Material UI Styles
import {
  Grid,
  Paper,
  Button,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Container,
  Collapse
} from '@material-ui/core'
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Alert, Box, Snackbar } from "@mui/material";

/**
 * Prepare class styles.
 * @type {(props?: any) => ClassNameMap<"contain"|"buttonStyle"|"collapseButtonStyle"|"table">}
 */
const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  buttonStyle: {
    margin: 5
  },
  collapseButtonStyle: {
    width: '100%',
    justifyContent: 'left',
    color: 'white',
    background: '#777',
    '&:hover': {
      background: '#555'
    },
    '&:active': {
      background: '#555'
    }
  },
  gridHeaderSeperatorless: {
    //backgroundColor: "#64B5F6",
    '& > .MuiDataGrid-columnSeparator': {
      visibility: 'hidden',
      width: '0px'
    }
  },
  toolbarButton: {
    marginLeft: "3px",
    marginTop: "4px",
    top: 0
  }
});

/**
 * Function from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @param name
 * @param url
 * @returns {string|null}
 */
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * This does not do anything, and I just used it as a reference for how to set up the event list.
 * @type {[{allDay: boolean, start: Date, end: Date, title: string}]}
 */
let eventsTest = [{
  title: "test",
  start: new Date('February 14, 2021 11:13:00'),
  end: new Date('February 14, 2021 14:13:00'),
  allDay: false,
}];

/**
 * This function returns the Scheduling page.
 * @returns {JSX.Element}
 * @constructor
 */
const MyCalendar = () => {
  const classes = useStyles();
  const localizer = momentLocalizer(moment)
  const [posts, setPosts] = useState([]);
  const [details, setDetails] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [postEvents, setPostEvents] = useState([]);
  const [selectedEventValues, setSelectedEventValues] = useState(formatCalendarEvent([]));

  /**
   * Set up the initial strings in the calendar.
   * Resource: https://github.com/jquense/react-big-calendar/issues/191
   * @type {{date: string, next: string, week: string, work_week: string, previous: string, tomorrow: string, agenda: string, yesterday: string, allDay: string, month: string, today: string, showMore: (function(*): string), noEventsInRange: string, time: string, event: string, day: string}}
   */
  let defaultMessages = {
    date: 'Date',
    time: 'Time',
    event: 'Event',
    allDay: 'All Day',
    week: 'Week',
    work_week: 'Work Week',
    day: 'Day',
    month: 'Month',
    previous: '<',
    next: '>',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    today: 'Today',
    agenda: 'Agenda',

    noEventsInRange: 'There are no events in this range.',

    showMore: total => `+${total} more`,
  }

  /**
   * Setup snackbar props.
   * snackbarOpen: Open state for snackbar popup messages.
   * snackMessage: Message to display on snackbar.
   * snackMessage: Type of snackbar to show. Affects color and icon.
   * Values: "success", "error", "warning", "info".
   */
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState();
  const [snackSeverity, setSnackSeverity] = useState();

  /**
   * Shows snackbar.
   * @param message The message to be displayed on snackbar.
   * @param severity The type of snackbar to show. Types: "success", "error", "warning", "info".
   */
  const showSnack = (message, severity) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackbarOpen(true);
  }

  /**
   * Handles snackbar close event.
   * @param event
   * @param reason
   */
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  /**
   * Setup sort model props.
   */
  const [sortModel, setSortModel] = useState([
    { field: 'urgency', sort: 'asc' },
    { field: 'priority', sort: 'asc' },
    { field: 'dateCreated', sort: 'asc' }
  ]);

  /**
   * Sorts the table by urgency, priority, and dateCreated.
   */
  const sortMostUrgent = () => {
    setSortModel([
      { field: 'urgency', sort: 'asc' },
      { field: 'priority', sort: 'asc' },
      { field: 'dateCreated', sort: 'asc' }
    ]);
  }

  /**
   * Sets event color.
   * 1. Check either `the event has passed current date` or `the event has been completed earlier`.
   * 2. Choose the event color basing on scanner value.
   * Future Feature: The color will depend on the departments.
   * Keyword: eventPropGetter
   * Resource: https://codesandbox.io/s/6ixeg
   * @param event The event array.
   * @param start The start date of the event.
   * @param end The end date of the event.
   * @param isSelected Indicate the selected event.
   * @returns {{style: {backgroundColor: (string|null)}}}
   */
  const eventStyleGetter = (event, start, end, isSelected) => ({
    style: {
      backgroundColor: new Date() > end || event.earlyComplete == true ? "#D3D3D3" :
        (
          event.scanner == 1 ? "#FF0100" :
            event.scanner == 2 ? "#61B100" : null
        )
    }
  });

  /**
   * Function to add the events to the calendar.
   * @param scheduleData The arrays are from the database.
   * @constructor
   */
  const Scheduling = (scheduleData) => {
    const twoWeeks = new Date().setDate(new Date().getDate() - 14);
    let listOfEvents = [];
    let expiryEvents = [];

    for (let i = 0; i < scheduleData.length; i++) {
      // Auto-complete calendar event if the end time has passed.
      if (new Date(twoWeeks) > new Date(scheduleData[i].endDateTime)) {
        completeScheduledEvent(scheduleData[i].calendarEvent_id);
        expiryEvents.push(formatCalendarEvent(scheduleData[i]));
      } else {
        listOfEvents.push(formatCalendarEvent(scheduleData[i]));
      }
    }

    getProtocolList(listOfEvents, expiryEvents);
  }

  /**
   * Completes scheduled event.
   * @param calendarEvent_id The calendar event id.
   */
  const completeScheduledEvent = (calendarEvent_id) => {
    axios.post('api/auth/finishProtocol', {
      calendarEvent_id: calendarEvent_id
    }).then(() => {
      showSnack("Remove completed event.", "success")
    });
  }

  /**
   * Gets calendar events from the database to read into the calendar.
   */
  const getCalenderList = () => {
    axios.get('api/auth/calendarEvents')
      .then(res => {
        // Populate empty array[] with objCalendarEvent.
        Scheduling(formatCalendarArray(res.data.objCalendarEvent));
      })
  }

  /**
   * Gets the protocol list from the database.
   * @param listOfEvents The list events.
   * @param expiryEvents The expiry events.
   */
  const getProtocolList = (listOfEvents, expiryEvents) => {
    axios.get('/api/auth/scheduleProtocolPage', {
      params: {
        role: localStorage.getItem('role'),
        approvalLevel: "Pending Scheduling"
      }
    }).then(res => {
      // Populate empty array[] with objScheduleProtocol.
      removeCompletedElement(listOfEvents, expiryEvents, formatProtocolArray(res.data.objScheduleProtocol))
    })
  }

  /**
   * Gets details from array.
   * @param scheduleProtocol_id The schedule protocol ID.
   */
  const getDetails = (scheduleProtocol_id) => {
    const isMatchID = (event) => event.scheduleProtocol_id === scheduleProtocol_id;

    setDetails(
      postEvents.find(isMatchID) ? postEvents[postEvents.findIndex(isMatchID)] : []
    );
  }

  /**
   * Handles the selected event from calendar.
   * @param e
   */
  const handleSelectEvent = (e) => {
    const { scheduleProtocol_id } = e;

    getDetails(scheduleProtocol_id);
    setSelectedEventValues({ ...e });
  }

  /**
   * Renders the selected event detail.
   * @returns {*} Table rows.
   */
  const renderDetails = () => {
    const detailsObj = details;

    if (detailsObj) {
      const detailsEntries = Object.entries(detailsObj);

      return requisitionList.map(field => {
        let data = detailsEntries.find(entry => entry[0] === field.field);
        data = data ? data[1] : 'Please select an event.';

        const header = field.headerName;

        return (
          <TableRow>
            <TableCell align="left">{header}: {data}</TableCell>
          </TableRow>
        );
      })
    }
  }

  /**
   * Renders the selected event detail (Collapse).
   * @returns {*} Table rows.
   */
  const renderCollapseDetails = () => {
    const detailsObj = details;

    if (detailsObj) {
      const detailsEntries = Object.entries(detailsObj);

      return collapseList.map(field => {
        let data = detailsEntries.find(entry => entry[0] === field.field);
        data = data ? data[1] : 'Please select an event.';
        const header = field.headerName;

        return (
          <TableRow>
            <TableCell align="left">{header}: {data}</TableCell>
          </TableRow>
        );
      })
    }
  }

  /**
   * Handles collapsed button for displaying selected event detail (Collapse).
   * Resource: https://react-bootstrap.github.io/utilities/transitions/
   * @returns {JSX.Element} A button with collapse function.
   */
  const collapseButton = () => {
    const [open, setOpen] = useState(false);
    const detailsObj = details;

    if (detailsObj) {
      return (
        <>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className={classes.collapseButtonStyle}
          >
            More Details
          </Button>
          <Collapse in={open} dimension="width">
            <div id="example-collapse-text">
              {renderCollapseDetails()}
            </div>
          </Collapse>
        </>
      );
    }
  }

  /**
   * Abandons the completed calendar events from the array.
   * Resource: https://stackoverflow.com/questions/36326612/how-to-delete-an-item-from-state-array
   *           https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
   *           https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
   * @param listOfEvents The list of events.
   * @param expiryEvents The expired events.
   * @param originalData The original array from database.
   */
  const removeCompletedElement = (listOfEvents, expiryEvents, originalData) => {
    let filterPosts = originalData;
    let eventDetails = [];

    // Walk through all the event lists.
    for (let row of listOfEvents) {
      const isMatchID = (event) => event.scheduleProtocol_id === row.scheduleProtocol_id;

      // Check whether the scheduleProtocol_id is already on the calendar.
      if (filterPosts.find(isMatchID)) {
        // Remove completed posts from array.
        // if (row.earlyComplete == true || new Date() > row.end) {
        eventDetails.push(filterPosts[filterPosts.findIndex(isMatchID)]);
        filterPosts.splice(filterPosts.findIndex(isMatchID), 1);
        // }
      }
    }

    // Walk through all the expiry events.
    for (let row of expiryEvents) {
      const isMatchID = (event) => event.scheduleProtocol_id === row.scheduleProtocol_id;

      if (filterPosts.find(isMatchID)) {
        filterPosts.splice(filterPosts.findIndex(isMatchID), 1);
      }
    }

    setPosts(filterPosts);
    setPostEvents(eventDetails);
    setEventsList(listOfEvents);
  }

  /**
   * Determines which button will be displayed basing on calendar event.
   * @param rows The rows will be compared with the calendar event list.
   * @returns {JSX.Element} Display either `Complete` button or `Schedule` button.
   */
  const displayButton = (rows) => {
    // // Walk through all the event lists.
    // for (let row of eventsList) {
    //     // Check whether the scheduleProtocol_id is already on the calendar.
    //     if ([rows].find(element => element.scheduleProtocol_id === row.scheduleProtocol_id)) {
    //         if (row.earlyComplete == false && row.end > new Date()) {
    //             return (
    //                 <EarlyCompleteCalendar
    //                     suggestedProtocol={rows.suggestedProtocol}
    //                     urgency={rows.urgency}
    //                     timing={rows.timing}
    //                     patientFirstName={rows.patientFirstName}
    //                     patientLastName={rows.patientLastName}
    //                     getCalenderList={getCalenderList}
    //                     calendarEvent_id={row.calendarEvent_id}
    //                     startDateTime={row.start}
    //                     endDate={row.end}
    //                     earlyComplete={row.earlyComplete}
    //                     showSnack={showSnack}
    //                 />
    //             )
    //         }
    //     }
    // }
    return (
      <AddCalendar
        rows={rows}
        events={eventsList}
        getCalenderList={getCalenderList}
        showSnack={showSnack}
      />
    )
  }

  /**
   * Fetches the calendar events and protocol data for mapping.
   */
  useEffect(() => {
    getCalenderList()
  }, [])

  return (
    <Container maxWidth='xl'>
      <Grid container style={{ alignItems: "flex-start", marginTop: "16px" }} xs={12} spacing={2}>
        {/**
              * Show calendar.
              */}
        <Grid item xs={8}>
          <div>
            <Calendar
              selectable
              defaultView="week"
              defaultDate={new Date()}
              localizer={localizer}
              events={eventsList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 800 }}
              onSelectEvent={handleSelectEvent}
              messages={defaultMessages}
              eventPropGetter={eventStyleGetter}
            />
          </div>
        </Grid>

        {/**
              * Show details in right side.
              */}
        <Grid item xs={4}>
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <th align="left" style={{ padding: 15 + "px", 'background': '#3399FF', position: 'relative' }}>
                      {/* Provide editing calendar button */}
                      {details.scheduleProtocol_id && <EditCalendar
                        selectedEventValues={selectedEventValues}
                        setSelectedEventValues={setSelectedEventValues}
                        events={eventsList}
                        onEventUpdated={setEventsList}
                        showSnack={showSnack}
                      />}
                      Selected Appointment Details:
                      {details.scheduleProtocol_id && <EarlyCompleteCalendar
                        rows={details}
                        selectedEventValues={selectedEventValues}
                        setSelectedEventValues={setSelectedEventValues}
                        events={eventsList}
                        onEventUpdated={setEventsList}
                        displayMessage={selectedEventValues.earlyComplete === false ? "Complete" : "Uncompleted"}
                        showSnack={showSnack}
                      />}
                    </th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderDetails()}
                  {collapseButton()}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>

        {/**
              * Implement color coding inside DataGrid.
              * Resource: https://mui.com/components/data-grid/style/
              * Debug Resource: https://stackoverflow.com/questions/52130076/how-to-change-the-hover-color-of-material-ui-table
              */}
        <Grid item xs={12}>
          <Box
            sx={protocolStyle}>
            <DataGrid
              autoHeight
              disableSelectionOnClick
              getRowClassName={(params) => indicateDate(params.row.dateCreated)}
              getRowId={(row) => row.scheduleProtocol_id}
              rows={posts}
              sortModel={sortModel}
              onSortModelChange={newSortModel => setSortModel(newSortModel)}
              initialState={{
                sorting: {
                  sortModel: sortModel
                }
              }}
              columns={[...protocolList,
              {
                field: "Button",
                flex: "auto",
                minWidth: 130,
                disableColumnMenu: true,
                sortable: false,
                headerClassName: classes.gridHeaderSeperatorless,
                renderHeader: () => (
                  <></>
                ),
                renderCell: (params) => displayButton(params.row)
              }
              ]}
              components={{
                Toolbar: () => (                                                                  // Custom toolbar header
                  <GridToolbarContainer>
                    <div style={{ display: "flex", alignContent: "center", borderBottom: "1px solid #0000003B", width: "100%" }}>
                      <div style={{ display: "flex", flex: 1.5, alignContent: "center" }}>
                        <div style={{ flex: 1.5 }}>
                          <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={sortMostUrgent}
                            style={{ marginBottom: "4px" }}
                            InputProps={{
                              className: classes.toolbarButton,
                            }}
                          >
                            Sort by most urgent
                          </Button>
                        </div>
                        <div style={{ flex: 1.5 }}></div>
                        <div style={{ flex: 1.5 }}></div>
                      </div>
                    </div>
                  </GridToolbarContainer>
                )
              }}
            />
          </Box>
        </Grid>

        {/**
              * Show popup message.
              */}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            severity={snackSeverity}
            onClose={handleSnackClose}
            sx={{ width: '100%' }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  )
}

export default MyCalendar;