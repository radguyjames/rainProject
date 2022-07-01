import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// component
import { signout } from "../../../stateManagement/actions/RegistrationAndAuthenticationAction";

// Styles
import {
  Box,
  Button,
  Badge,
  Typography,
  Menu,
  Collapse,
  MenuItem,
  Divider,
} from "@material-ui/core";

export const AccountMenu = () => {
  const isAuthenticated = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.boolIsAuthenticated
  );

  const loggedInUser = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.objLoggedInUser
  );

  const dispatch = useDispatch();
  const loggedInUserToken = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.token
  );

  // state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // data array
  const arrAccountMenuItem = [
    "Notification",
    "User Profile",
    "Account Setting",
    "Change Password",
    "Sign out",
  ];

  const authMenu = (
    <div>
      <Button onClick={handleClick} style={{ textTransform: "capitalize" }}>
        <Badge color="secondary" badgeContent={0} variant="dot">
          <Typography
            noWrap
            style={{ color: "#fff", fontSize: "clamp(20px, 4vh, 28px)" }}
          >
            {loggedInUser !== null && loggedInUser.first_name}
          </Typography>
        </Badge>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Collapse}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {arrAccountMenuItem.map((item, index) => [
          <MenuItem
            key={index}
            onClick={
              index === 4
                ? () => {
                    setAnchorEl(null);
                    signout(loggedInUserToken, dispatch);
                  }
                : handleClose
            }
          >
            {item}
          </MenuItem>,
          (index === 0 || index === 3) && <Divider />,
        ])}
      </Menu>
    </div>
  );

  // https://gist.github.com/James1x0/8443042
  const currentHour = new Date().getHours();

  const greetingMessage =
    currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
      ? "Good morning"
      : currentHour >= 12 && currentHour <= 17 // after 12:00PM and before 6:00pm
      ? "Good afternoon"
      : currentHour > 17 || currentHour < 4 // after 5:59pm or before 4:00AM (to accommodate night owls)
      ? "Good evening"
      : "Welcome"; // if for some reason the calculation didn't work

  const guestMenu = (
    <Button disabled>
      <Typography
        noWrap
        style={{
          color: "#fff",
          fontSize: "clamp(20px, 4vh, 28px)",
          textTransform: "none",
        }}
      >
        {greetingMessage}!
      </Typography>
    </Button>
  );

  return <Box mr={6}>{isAuthenticated ? authMenu : guestMenu}</Box>;
};
