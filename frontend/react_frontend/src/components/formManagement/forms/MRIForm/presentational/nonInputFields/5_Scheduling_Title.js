import React from "react";

// Styles
import { Typography, Box } from "@material-ui/core";

export const Scheduling_Title = () => {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        style={{
          textTransform: "uppercase",
          fontSize: "13.4px",
          fontWeight: "bold",
          paddingRight: "16px",
        }}
      >
        Scheduling
      </Typography>

      <Typography
        style={{
          fontSize: "13.4px",
        }}
      >
        (Note: Radiologist will use expert and evidence-based criteria to
        prioritize request)
      </Typography>
    </Box>
  );
};
