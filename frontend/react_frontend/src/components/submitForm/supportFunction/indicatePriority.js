/**
 * Indicate the priority.
 * @param value The priority value.
 * @returns {string} The class name will be used in the style.
 */
const indicatePriority = (value) => {
    const result = value > 36 ? 'priorityPassTen' :
                   value > 32 ? 'priorityPassNine' :
                   value > 28 ? 'priorityPassEight' :
                   value > 24 ? 'priorityPassSeven' :
                   value > 20 ? 'priorityPassSix' :
                   value > 16 ? 'priorityPassFive' :
                   value > 12 ? 'priorityPassFour' :
                   value > 8 ? 'priorityPassThree' :
                   value > 4 ? 'priorityPassTwo' : 'priorityPassOne';

    return result;
}

export default indicatePriority;