/**
 * List of requisition array.
 * @type {[{headerName: string, field: string},{headerName: string, field: string},{headerName: string, field: string},{headerName: string, field: string},{headerName: string, field: string},null,null,null]}
 */
const requisitionList = [
    { headerName: "Req ID", field: 'customRequisition_id' },
    { headerName: "Urgency", field: "urgency" },
    { headerName: "Time", field: "timing" },
    { headerName: "Submission Date", field: "dateCreated" },
    { headerName: "Patient First Name", field: "patientFirstName" },
    { headerName: "Patient Last Name", field: "patientLastName" },
    { headerName: "Anatomical Location", field: "anatomicalLocation" },
    { headerName: "Sub Location", field: "subLocation" },
    //{ headerName: "Precaution", field: "precaution" },
    //{ headerName: "Ward", field: "ward" },
    //{ headerName: "Protocol", field: "suggestedProtocol" },
    //{ headerName: "Sequences", field: "sequences" },
    //{ headerName: "Clinician", field: "clinician" },
    //{ headerName: "Feedback", field: "feedback" },
    //{ headerName: "Mobility Requirement", field: "mobilityRequirement" },
    //{ headerName: "Additional Comments", field: "additionalComments" },
    //{ headerName: "Scheduled Date", field: "******" },
    //{ headerName: "Scheduled Time", field: "**" },
    //{ headerName: "PHIN", field: "phin" },
];

export default requisitionList;