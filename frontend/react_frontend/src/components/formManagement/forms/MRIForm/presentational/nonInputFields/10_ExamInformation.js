import React from "react";

// Styles
import { Box, Typography } from "@material-ui/core";

export const ExamInformation = () => {
  return (
    <Box>
      <Typography
        style={{
          textTransform: "uppercase",
          fontSize: "13.4px",
          fontWeight: "bold",
        }}
      >
        Exam Information
      </Typography>
    </Box>
  );
};
