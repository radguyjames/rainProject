/**
 * Evaluate the passing days between current date and recorded date.
 * Method: Use day of the year.
 * Resource: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
 * @param record The recorded date.
 * @returns {string} The class name which is going to be used in the style.
 */
const indicateDate = (record) => {
    // Calculate `the day of the year` value.
    const OneDay = 1000 * 60 * 60 * 24;

    // Current Date
    const currentDate = new Date();
    const currentStart = new Date(currentDate.getFullYear(), 0, 0);
    const currentDiff = currentDate - currentStart;
    const currentDay = Math.floor(currentDiff / OneDay);

    // Record Date
    const recordDate = new Date(record);
    const recordStart = new Date(recordDate.getFullYear(), 0, 0);
    const recordDiff = recordDate - recordStart;
    const recordDay = Math.floor(recordDiff / OneDay);

    // Add extra days by comparing with current year and recorded year.
    const yearGap = (currentDate.getFullYear() - recordDate.getFullYear()) * 365;

    // Calculate the different days according to `day of the year`.
    const daysGap = currentDay - recordDay + yearGap;

    const result = daysGap >= 7 ? 'passSevenDays' :
                   daysGap >= 3 ? 'passThreeDays' : '';

    return result;
}

export default indicateDate;