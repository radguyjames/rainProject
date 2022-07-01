import React from "react";

// Styles
import { Box, Typography } from "@material-ui/core";

export const PatientInformation_Title = () => {
  return (
    <Box mt={0.6}>
      <Typography
        style={{
          fontSize: "1.2rem",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Patient Information
      </Typography>
    </Box>
  );
};
