import React, { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// React Router
import { Link, Redirect } from "react-router-dom";

// Styles
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { VpnKeyOutlined as VpnKeyOutlinedIcon } from "@material-ui/icons";

export const ForgotPassword = () => {
  const isAuthenticated = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.boolIsAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) return <Redirect to="/apps" />;
  }, [isAuthenticated]);

  // icon & title
  const iconAndTitle = (
    <div>
      <Avatar style={{ backgroundColor: "#e33371", margin: "8px" }}>
        <VpnKeyOutlinedIcon />
      </Avatar>
      <Typography noWrap variant="h5">
        Please enter your user name
      </Typography>
    </div>
  );

  // username input
  const usernameInput = (
    <TextField
      autoFocus
      fullWidth
      label="User Name (Email)"
      margin="normal"
      name="username"
      required
      variant="outlined"
    />
  );

  // Submit button
  const submitButton = (
    <Button color="primary" fullWidth type="submit" variant="contained">
      Submit
    </Button>
  );

  // redirect link button - Sign in & Register
  const redirectLinkButton = (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item>
        <Button
          component={Link}
          style={{ textTransform: "capitalize" }}
          to="/register"
        >
          Don't have an account? Register
        </Button>
      </Grid>
    </Grid>
  );

  // text after submit
  // const textAfterSubmit = [];

  return (
    <Container
      maxWidth="sm"
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "36px",
      }}
    >
      {iconAndTitle}
      <form style={{ marginTop: "8px", width: "100%" }}>
        {usernameInput}
        <Box mt={3} mb={2}>
          {submitButton}
        </Box>

        {redirectLinkButton}
      </form>
    </Container>
  );
};

/* <Typography
          component="h1"
          variant="h4"
          paragraph
          className={classes.root}
        >
          An email has been sent to you. Please check the email address (your
          user name) and follow instructions to finish resetting your password.
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          paragraph
          className={classes.root}
        >
          Didn't receive any emails from RAIN? Please contact RAIN Service Desk:
          (###)-###-####.
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          paragraph
          className={classes.root}
        >
          Thank you!
        </Typography> */
