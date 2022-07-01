import React from "react";

// Redux
import { useSelector } from "react-redux";

// React Router
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

// Styles
import { Box, Breadcrumbs, Button, Typography } from "@material-ui/core";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons/";

export const NavbarLink = (props) => {
  
  let location = useLocation()
  const isAuthenticated = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.boolIsAuthenticated
  );
  

  //Will build and return the links for the breadcrumb based on the URL.
  const buildAuthLink = () => {
  
    let paths = location.pathname.split('/')
    paths.shift()
    let returnLinks = []
    let currentPath = "/"

    paths.forEach(element => {
      currentPath += element + '/'
      returnLinks.push({text: element, path: currentPath})
    })
    
    return(returnLinks)
  }

  const guestLink = [
    { text: "Sign in", path: "/signin" },
    { text: "Forgot Password", path: "/forgotpassword" },
    { text: "Register", path: "/register" },
  ];

  return (
    <Box ml={6}>
      <Breadcrumbs
        separator={
          isAuthenticated ? <NavigateNextIcon fontSize="small" /> : "|"
        }
      >
        {(isAuthenticated ? buildAuthLink() : guestLink).map((item, index) => (
          <Button key={index} component={Link} to={item.path}>
            <Typography noWrap variant="h6" color="primary">
              {item.text}
            </Typography>
          </Button>
        ))}
      </Breadcrumbs>
    </Box>
  );
};
