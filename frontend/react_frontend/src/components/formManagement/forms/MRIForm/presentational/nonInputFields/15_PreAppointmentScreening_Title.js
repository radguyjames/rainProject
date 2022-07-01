import React from "react";

// Styles
import { Typography, Box } from "@material-ui/core";

export const PreAppointmentScreening_Title = () => {
  return (
    <Box px={1}>
      <Typography style={{ fontSize: "13.4px" }}>
        <span style={{ fontWeight: "bold" }}>PRE-APPOINTMENT SCREENING</span>
        &nbsp;(attach implant records to requisition)
      </Typography>
    </Box>
  );
};
