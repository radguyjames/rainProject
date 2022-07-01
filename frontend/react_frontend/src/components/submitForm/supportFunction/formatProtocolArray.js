// Import support function
import formatRequisitionArray from "./formatRequisitionArray";
import zipArray from "./zipArray";

/**
 * Reformat protocol array.
 * @param rows The initial rows from ScheduleProtocol model.
 * @returns {*[]} Nested array without foreign key.
 */
const formatProtocolArray = (rows) => {
    let newRows = [];
    let customRequisitionRows = [];

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
        let protocols_id = [];
        let protocols = [];
        let sequences = [];

        for (let protocol of row.suggestedProtocol) {
            protocols_id.push(protocol.ProtocolID.id);
            protocols.push(protocol.ProtocolID.protocol);
        }

        for (let sequence of row.sequences) {
            sequences.push(sequence.sequenceID.sequence);
        }

        protocols_id = protocols_id.join(', ');
        protocols = protocols.join(', ');
        sequences = sequences.join(', ');

        let tempRow = {
            scheduleProtocol_id: row.id,
            suggestedProtocol_id: protocols_id,
            suggestedProtocol: protocols,
            sequences: sequences,
            timing: row.timing,
            approvalLevel: row.approvalLevel,
            confidence: row.confidence
        };

        newRows.push(tempRow);
        customRequisitionRows.push(row.customRequisition);
    }

    // Combine with formatRequisitionArray
    newRows = zipArray(newRows, formatRequisitionArray(customRequisitionRows));

  return newRows;
}

export default formatProtocolArray;