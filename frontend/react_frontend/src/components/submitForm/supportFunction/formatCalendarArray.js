// Import support function
import formatProtocolArray from "./formatProtocolArray";
import zipArray from "./zipArray";

/**
 * Reformat calendar array.
 * @param rows The initial rows from CalendarEvent model.
 * @returns {*[]} Nested array without foreign key.
 */
const formatCalendarArray = (rows) => {
    let newRows = [];
    let scheduleProtocolRows = [];

    /**
     * Option 1:
     * Separate foreign key into another individual rows.
     */
    // for (let index = 0; index < rows.length; index++) {
    //     const element = rows[index].customRequisition;
    //     newRows.push(element);
    // }

    /**
     * Option 2:
     * Reformat entire rows.
     */
    for (let row of rows) {
        let tempRow = {
            calendarEvent_id: row.id,
            startDateTime: row.startDateTime,
            endDateTime: row.endDateTime,
            earlyComplete: row.earlyComplete,
            scanner: row.scanner
        };

        newRows.push(tempRow);
        scheduleProtocolRows.push(row.scheduleProtocol);
    }

    // Combine with formatProtocolArray
    newRows = zipArray(newRows, formatProtocolArray(scheduleProtocolRows));

  return newRows;
}

export default formatCalendarArray;