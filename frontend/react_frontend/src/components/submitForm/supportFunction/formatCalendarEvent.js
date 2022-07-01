/**
 * Provides calendar event format.
 * @param row The single formatted row from formatCalendarArray.
 * @returns {{earlyComplete: *, allDay: boolean, timing: *, scanner: (number|*), start: Date, end: Date, calendarEvent_id: *, title: string, scheduleProtocol_id: *}}
 */
const formatCalendarEvent = (row) => {
    const calendarEvent_id = row.calendarEvent_id ? row.calendarEvent_id : undefined;
    const scheduleProtocol_id = row.calendarEvent_id ? row.scheduleProtocol_id : undefined;
    const earlyComplete = row.calendarEvent_id ? row.earlyComplete : undefined;
    const scanner = row.calendarEvent_id ? row.scanner : undefined;
    const title = row.calendarEvent_id ? row.patientFirstName
        + " " + row.patientLastName
        + " - " + row.suggestedProtocol : undefined;
    const start = row.calendarEvent_id ? new Date(row.startDateTime) : undefined;
    const end = row.calendarEvent_id ? new Date(row.endDateTime) : undefined;
    const timing = row.calendarEvent_id ? row.timing : undefined;
    const allDay = row.calendarEvent_id ? false : undefined;

    return {
        calendarEvent_id: calendarEvent_id,
        scheduleProtocol_id: scheduleProtocol_id,
        earlyComplete: earlyComplete,
        scanner: scanner,
        title: title,
        start: start,
        end: end,
        timing: timing,
        allDay: allDay
    };
}

export default formatCalendarEvent;