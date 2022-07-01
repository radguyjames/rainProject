import React from "react";

// Styles
import { Box, Typography } from "@material-ui/core";

export const Footer = () => {
  return (
    <Box
      pt={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography noWrap style={{ fontWeight: "bold", fontSize: "13.4px" }}>
        All requests will be distributed to an appropriate location.{" "}
        <span style={{ fontSize: "16px" }}>
          For Emergent Requests, please call Radiologist directly.
        </span>
      </Typography>

      <Typography noWrap style={{ fontWeight: "bold", fontSize: "13.4px" }}>
        Required Information is marked with an “*” and must be completed or the
        request will be declined.
      </Typography>
    </Box>
  );
};
