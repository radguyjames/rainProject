import React from "react";

// Import support function
import renderCellExpand from "../supportFunction/renderCellExpand";
import indicateUrgency from "../supportFunction/indicateUrgency";
import indicatePriority from "../supportFunction/indicatePriority";

/**
 * Sets protocol columns.
 * Ready for DataGrid to use.
 */
const protocolList = [
    {
        flex: 0.4,
        headerName: "Requisition ID",
        field: 'customRequisition_id',
        type: 'number',
        align: 'center',
        renderCell: renderCellExpand
        // cellClassName: () => 'MuiDataGrid-cell--textCenter'
    },
    {
        flex: 0.4,
        headerName: "Urgency",
        field: 'urgency',
        type: 'number',
        align: 'center',
        cellClassName: (params) => indicateUrgency(params.value),
        // renderCell: renderCellExpand
    },
    {
        flex: 0.4,
        headerName: "Priority",
        field: 'priority',
        type: 'number',
        align: 'center',
        cellClassName: (params) => indicatePriority(params.value),
        // renderCell: renderCellExpand
    },
    {
        flex: 0.75,
        headerName: "Submission Date",
        field: 'dateCreated',
        type: 'dateTime',
        renderCell: renderCellExpand
    },
    // { headerName: "Precaution", field: 'precaution', width: 100 },
    // { headerName: "Ward", field: 'ward', width: 155 },
    { flex: 0.25, headerName: "PHIN", field: 'phin', renderCell: renderCellExpand },
    // { headerName: "Patient First Name", field: 'patientFirstName', width: 150 },
    // { headerName: "Patient Last Name", field: 'patientLastName', width: 150 },
    { flex: 1, headerName: "Suggested Protocol", field: 'suggestedProtocol', renderCell: renderCellExpand },
    {
        flex: 1,
        headerName: "Sequences",
        field: 'sequences',
        renderCell: renderCellExpand
    },
    {
        flex: 0.6,
        headerName: "Confidence Interval",
        field: 'confidence',
        type: 'number',
        // renderCell: renderCellExpand,
        valueFormatter: (params) => {
            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        }
    },
    {
        flex: 0.4,
        headerName: "Exam Time",
        field: 'timing',
        // type: 'number',
        // renderCell: renderCellExpand,
        valueFormatter: (params) => {
            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} minutes`;
        }
    },
    {
        flex: 1,
        headerName: "Clinical Information",
        field: 'clinicalInformation',
        renderCell: renderCellExpand
    },
    { flex: 0.5, headerName: "Approval Level", field: 'approvalLevel', renderCell: renderCellExpand }
];

export default protocolList;