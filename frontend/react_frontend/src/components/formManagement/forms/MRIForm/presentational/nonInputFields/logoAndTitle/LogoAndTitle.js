import React from "react";

// Components
import SharedhealthLogoImg from "./SharedhealthLogo.png";

// Styles
import { Box, Grid, Typography } from "@material-ui/core";

export const LogoAndTitle = () => {
  /* #region  render section */
  return (
    <Grid container direction="column">
      <Grid item>
        <Box
          width={1}
          height={79}
          style={{
            backgroundImage: `url(${SharedhealthLogoImg})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Grid>
      <Grid item>
        <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
          Fax non-emergent MRI requests to 204-926-3650 (in Winnipeg) /
          1-866-210-6119 (outside of Winnipeg)
        </Typography>
      </Grid>
      <Grid item>
        <Typography noWrap variant="h5" style={{ fontWeight: "bold" }}>
          MRI Request Form
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption">
          Incomplete / illegible forms will be returned.
        </Typography>
      </Grid>
    </Grid>
  );
  /* #endregion */
};
