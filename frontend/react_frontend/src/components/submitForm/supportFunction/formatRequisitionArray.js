/**
 * Reformat requisition array.
 * @param rows The initial rows from CustomRequisition model.
 * @returns {*[]} Nested array without foreign key.
 */
const formatRequisitionArray = (rows) => {
    let newRows = [];

    // // Option 1:
    // // Separate foreign key into another individual rows.
    // for (let index = 0; index < rows.length; index++) {
    //     const element = rows[index].isolationPrecaution;
    //     newRows.push(element);
    // }

    // Option 2:
    // Reformat entire rows.
    for (let row of rows) {
        let tempRow = {
            customRequisition_id: row.id,
            clinicalInformation: row.clinicalInformation,
            urgency: row.urgency,
            priority: row.priority,
            dateCreated: row.dateCreated,
            patientFirstName: row.patientFirstName,
            patientLastName: row.patientLastName,
            phin: row.phin,
            weight: row.weight,
            height: row.height,
            ward: row.ward,
            clinician: row.clinician,
            gender: row.gender,
            dob: row.dob,
            feedback: row.feedback,
            additionalComments: row.additionalComments,
            anatomicalLocation_id: row.anatomicalLocation.id,
            anatomicalLocation: row.anatomicalLocation.type,
            subLocation_id: row.subLocation.id,
            subLocation: row.subLocation.subtype,
            subLocation_typeID: row.subLocation.typeID,
            isolationPrecaution_id: row.isolationPrecaution.id,
            isolationPrecaution: row.isolationPrecaution.isolationPrecaution,
            mobilityRequirement_id: row.mobilityRequirement.id,
            mobilityRequirement: row.mobilityRequirement.mobilityRequirement,
            sedationRequirement_id: row.sedationRequirement.id,
            sedationRequirement: row.sedationRequirement.sedationRequirement,
            sedationRequirement_message: row.sedationRequirement.message
        };

        newRows.push(tempRow);
    }

  return newRows;
}

export default formatRequisitionArray;