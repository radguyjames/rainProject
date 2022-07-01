/**
 * Indicate the urgency.
 * @param value The urgency value.
 * @returns {string} The class name will be used in the style.
 */
const indicateUrgency = (value) => {
    const result = value >= 4 ? 'urgencyPassFour' :
                   value >= 3 ? 'urgencyPassThree' :
                   value >= 2 ? 'urgencyPassTwo' : 'urgencyPassOne';

    return result;
}

export default indicateUrgency;