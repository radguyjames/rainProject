import React from "react";

// Styles
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Paper,
} from "@material-ui/core";

export const LogArea = () => {
  // data array
  const arrTimelineContent = [
    {
      TimelineDotColor: { backgroundColor: "black" },
      StageChange: "Archived",
      OperationType: "Requisition Placed",
      User: "BY User Name/Clerk",
      TimeStamp: "2020 07 21 11:26 AM",
      Descritpion: "No field(s) changed.",
      Comment: "",
    },
    {
      TimelineDotColor: { backgroundColor: "purple" },
      StageChange: "Ready to book",
      OperationType: "Requisition Placed",
      User: "BY RAIN",
      TimeStamp: "2020 07 21 11:26 AM",
      Descritpion: "No field(s) changed.",
      Comment: "",
    },
    {
      TimelineDotColor: { backgroundColor: "green" },
      StageChange: "Timing",
      OperationType: "Requisition Placed",
      User: "BY RAIN",
      TimeStamp: "2020 07 20 09:09 AM",
      Descritpion: "Prorotol C-Spine Tumour has been selected.",
      Comment: "",
    },
    {
      TimelineDotColor: { backgroundColor: "blue" },
      StageChange: "Coding",
      OperationType: "Requisition Placed",
      User: "BY User Name/Clerk, Physician",
      TimeStamp: "2020 07 16 04:36 PM",
      Descritpion: "No field(s) changed.",
      Comment:
        "Surgical implants report has been added, please review current protocol.",
    },
    {
      TimelineDotColor: { backgroundColor: "red" },
      StageChange: "Denied/Retracted",
      OperationType: "Requisition Denied/Retracted",
      User: "BY User Name/Technologist",
      TimeStamp: "2020 07 16 02:44 PM",
      Descritpion: "No field(s) changed.",
      Comment:
        "Protocol nolonger accommodate, please send back for coding again.",
    },
    {
      TimelineDotColor: { backgroundColor: "green" },
      StageChange: "Timing",
      OperationType: "Requisition Placed",
      User: "BY User Name/Clerk, Physician",
      TimeStamp: "2020 07 16 09:06 AM",
      Descritpion: "Surgical implants: attachment detected.", //file hash
      Comment: "Surgical implants report has been updated.",
    },
    {
      TimelineDotColor: { backgroundColor: "red" },
      StageChange: "Denied/Retracted",
      OperationType: "Requisition Denied/Retracted",
      User: "BY User Name/Clerk, Physician",
      TimeStamp: "2020 07 13 03:06 PM",
      Descritpion: "No field(s) changed.",
      Comment: "Surgical implants report needs a second review.",
    },
    {
      TimelineDotColor: { backgroundColor: "green" },
      StageChange: "Timing",
      OperationType: "Requisition Placed",
      User: "BY RAIN",
      TimeStamp: "2020 07 13 02:29 PM",
      Descritpion: "Prorotol C-Spine Disc has been selected.",
      Comment: "",
    },
    {
      TimelineDotColor: { backgroundColor: "blue" },
      StageChange: "Coding",
      OperationType: "Requisition Placed",
      User: "BY User Name/Clerk, Physician",
      TimeStamp: "2020 07 09 10:36 AM",
      Descritpion: "Surgical implants: attachment detected.",
      Comment: "Surgical implants report has been added.",
    },
    {
      TimelineDotColor: { backgroundColor: "red" },
      StageChange: "Denied/Retracted",
      OperationType: "Requisition Denied/Retracted",
      User: "BY User Name/Radiologist",
      TimeStamp: "2020 07 08 01:00 PM",
      Descritpion: "No field(s) changed.",
      Comment: "Surgical implants report must be added.",
    },
    {
      TimelineDotColor: { backgroundColor: "blue" },
      StageChange: "Coding",
      OperationType: "Requisition Placed",
      User: "BY User Name/Clerk, Physician",
      TimeStamp: "2020 07 01 03:09 PM",
      Descritpion:
        "WCB#: empty->XXXXXXXX; Language Required: empty->French; Surgical implants: no change.",
      Comment:
        "WCB# and Translation language has been added, bypass surgical implants.",
    },
    {
      TimelineDotColor: { backgroundColor: "#f57c00" },
      StageChange: "Pending",
      OperationType: "Requisition Held",
      User: "BY RAIN",
      TimeStamp: "2020 07 01 09:00 AM",
      Descritpion:
        "Other Insurance, Translator, Surgical implants - 3 fields need further investigation.",
      Comment: "",
    },
    {
      TimelineDotColor: { backgroundColor: "grey" },
      StageChange: "Creation",
      OperationType: "Requisition Created",
      User: "BY User Name/Clerk, Physician",
      TimeStamp: "2020 07 01 09:00 AM",
      Descritpion: "Requisition has been created.",
      Comment: "",
    },
  ];

  return (
    <Accordion
      square
      style={{
        backgroundColor: "rgba(0, 0, 0, .03)",
      }}
    >
      <AccordionSummary style={{ minHeight: "64px" }}>
        <Box display="flex">
          <Typography>Processing History</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Timeline>
          {arrTimelineContent.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                style={{ display: "none" }}
              ></TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector
                  style={
                    index === 0
                      ? { visibility: "hidden" }
                      : { visibility: "visible" }
                  }
                />
                {index === 0 ? (
                  <TimelineDot variant="outlined" />
                ) : (
                  <TimelineDot
                    variant="default"
                    style={item.TimelineDotColor}
                  />
                )}

                <TimelineConnector
                  style={
                    index === arrTimelineContent.length - 1
                      ? { visibility: "hidden" }
                      : { visibility: "visible" }
                  }
                />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={3}
                  style={{
                    padding: "6px 16px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      style={item.TimelineDotColor}
                      color="info.contrastText"
                      mx={1}
                      px={1}
                    >
                      <Typography>{item.StageChange}</Typography>
                    </Box>
                    <Box display="flex" flexGrow={1} alignItems="center">
                      <Box>
                        <Typography>
                          {item.OperationType}&nbsp;{item.User}
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexGrow={1}
                        justifyContent="flex-end"
                      >
                        <Typography>
                          &#64;&nbsp;
                          {item.TimeStamp}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" mx={1} pl={6}>
                    <Typography variant="subtitle2">
                      Description:&nbsp;{item.Descritpion}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mx={1} pl={6}>
                    <Typography variant="subtitle2">
                      Comment:&nbsp;{item.Comment}
                    </Typography>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </AccordionDetails>
    </Accordion>
  );
};
