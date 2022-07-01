import React from "react";

// Styles
import { Box, Typography } from "@material-ui/core";

export const FootNote = () => {
  return (
    <Box
      px={6}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography noWrap style={{ fontSize: "13.4px" }}>
        <span style={{ fontSize: "18px" }}>R</span>130-80-04 V03
      </Typography>
      <Typography noWrap style={{ fontSize: "13.4px" }}>
        Page 1 of 1
      </Typography>
      <Typography noWrap style={{ fontSize: "13.4px" }}>
        Effective Date: 01-MAY-2019
      </Typography>
    </Box>
  );
};
