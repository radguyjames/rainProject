/**
 * Finds the conflict event.
 * @param events The current calendar events.
 * @param values The values will be added on the calendar events.
 * @returns {*[]}
 */
const conflictEvent = (events, values) => {
    const newStartDate = new Date(values.startDateTime);
    const newEndDate = new Date(values.startDateTime);
    newEndDate.setHours(newEndDate.getHours(), newEndDate.getMinutes() + values.timing, 0, 0);

    /**
     * Gets the total minutes of the date.
     * @param date The date will be calculated into minutes.
     * @returns {*} The total minutes.
     */
    const calculateMinutes = (date) => {
        return date.getHours() * 60 + date.getMinutes()
    }

    if (events.length > 0) {
        const filterScanner = events.filter(event => event.scanner === values.scanner);
        const filterYear = filterScanner.filter(
            event =>
                new Date(event.start).getFullYear() === newStartDate.getFullYear() ||
                new Date(event.end).getFullYear() === newStartDate.getFullYear() ||
                new Date(event.start).getFullYear() === newEndDate.getFullYear() ||
                new Date(event.end).getFullYear() === newEndDate.getFullYear()
        );
        const filterMonth = filterYear.filter(
            event =>
                new Date(event.start).getMonth() <= newStartDate.getMonth() &&
                newStartDate.getMonth() <= new Date(event.end).getMonth() ||
                new Date(event.start).getMonth() <= newEndDate.getMonth() &&
                newEndDate.getMonth() <= new Date(event.end).getMonth()
        );
        const filterDay = filterMonth.filter(
            event =>
                new Date(event.start).getDate() <= newStartDate.getDate() &&
                newStartDate.getDate() <= new Date(event.end).getDate() ||
                new Date(event.start).getDate() <= newEndDate.getDate() &&
                newEndDate.getDate() <= new Date(event.end).getDate()
        );

        return filterDay.filter(
            event =>
                calculateMinutes(new Date(event.start)) <= calculateMinutes(newStartDate) &&
                calculateMinutes(newStartDate) < calculateMinutes(new Date(event.end)) ||
                calculateMinutes(new Date(event.start)) < calculateMinutes(newEndDate) &&
                calculateMinutes(newEndDate) <= calculateMinutes(new Date(event.end))
        );
    }

    return [];
}
export default conflictEvent;