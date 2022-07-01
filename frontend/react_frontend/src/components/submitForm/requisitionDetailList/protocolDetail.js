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
        flex: 0.8,
        headerName: "Requisition ID",
        field: 'customRequisition_id',
        type: 'number',
        align: 'center',
        renderCell: renderCellExpand
    },
    {
        flex: 0.75,
        headerName: "Urgency",
        field: 'urgency',
        type: 'number',
        align: 'center',
        cellClassName: (params) => indicateUrgency(params.value),
        // renderCell: renderCellExpand
   },
   {
       flex: 0.75,
       headerName: "Priority",
       field: 'priority',
       type: 'number',
       align: 'center',
       cellClassName: (params) => indicatePriority(params.value),
    //    renderCell: renderCellExpand
   },
    {
        flex: 1.5,
        headerName: "Submission Date",
        field: 'dateCreated',
        type: 'dateTime',
        renderCell: renderCellExpand
    },
    { flex: 1, headerName: "Precaution", field: 'isolationPrecaution', renderCell: renderCellExpand },
    { flex: 0.75, headerName: "Ward", field: 'ward', renderCell: renderCellExpand },
    { flex: "auto", headerName: "PHIN", field: 'phin', renderCell: renderCellExpand  },
    { flex: 1, headerName: "First Name", field: 'patientFirstName', renderCell: renderCellExpand },
    { flex: 1, headerName: "Last Name", field: 'patientLastName', renderCell: renderCellExpand },
    { flex: 1, headerName: "Protocol", field: 'suggestedProtocol', renderCell: renderCellExpand },
    {
        flex: 1,
        headerName: "Sequences",
        field: 'sequences',
        renderCell: renderCellExpand
    },
    // {
    //     headerName: "Confidence Interval",
    //     field: 'confidence',
    //     width: 155,
    //     type: 'number',
    //     valueFormatter: (params) => {
    //         const valueFormatted = Number(params.value).toLocaleString();
    //         return `${valueFormatted} %`;
    //     }
    // },
    {
        flex: 0.75,
        headerName: "Exam Time",
        field: 'timing',
        type: 'number',
        // renderCell: renderCellExpand,
        valueFormatter: (params) => {
            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} minutes`;
        }
    },
    {
        flex: 1.2,
        headerName: "Clinical Information",
        field: 'clinicalInformation',
        renderCell: renderCellExpand
    },
    // { headerName: "Approval Level", field: 'approvalLevel', width: 140 }
];

export default protocolList;