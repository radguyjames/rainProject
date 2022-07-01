import React from "react";

// React Router
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Components
import LogoImg from "./logo.png";
import { signout } from "../../../../stateManagement/actions/RegistrationAndAuthenticationAction";

// Styles
import { Button } from "@material-ui/core";

export const Logo = () => {

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

  return (
    <Button
      component={Link}
      to={isAuthenticated ? "/apps" : "/signin"}
      style={{
        height: "100%",
        width: "36vh",
        minWidth: "171px",
        maxWidth: "301px",
        backgroundImage: `url(${LogoImg})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      // onClick={signout(loggedInUserToken, dispatch)}
    >
    </Button>
  );
};
