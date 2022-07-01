/**
 * Combines two json arrays into one json array.
 * Resource: https://stackoverflow.com/questions/65834784/combine-two-json-arrays-into-one-json-array-where-the-data-will-be-completely-me
 * @param firstArray The first array.
 * @param secondArray The second array.
 * @returns {(*)[]} A single array with both arrays data.
 */
const zipArray = (firstArray, secondArray) => {
    if (!firstArray.length || !secondArray.length) return [];

    // get an empty object from first array with "" as values
    const firstSchema = Object.keys(firstArray[0]).reduce((acc, cur) => {
      acc[cur] = "";
      return acc;
    }, {});

    // get an empty object from second array with "" as values
    const secondSchema = Object.keys(secondArray[0]).reduce((acc, cur) => {
      acc[cur] = "";
      return acc;
    }, {});

    // create an empty schema object merged with both above schemas
    const emptySchema = { ...firstSchema, ...secondSchema };

    const zip = (a, b) =>
      Array.from(Array(Math.max(b.length, a.length)), (_, i) => ({
          ...emptySchema,
          ...a[i],
          ...b[i],
    }));

    const zippedArray = zip(firstArray, secondArray)

    return zippedArray;
}

export default zipArray;