import React from "react";

// Styles
import { Typography, Box } from "@material-ui/core";

export const PreAppointmentScreening_Heading = () => {
  return (
    <Box display="flex" alignItems="center">
      <Box flexGrow={1} height={46}></Box>
      <Box
        width={66}
        height={46}
        borderLeft={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography style={{ fontSize: "13.4px" }}>Y</Typography>
      </Box>
      <Box
        width={66}
        height={46}
        borderLeft={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography style={{ fontSize: "13.4px" }}>N</Typography>
      </Box>
    </Box>
  );
};
