import axios from "axios";
import * as actions from "./ActionTypes";

/* #region  Get username exists Section */
export const getUsernameExists = (username, dispatch) => {
  const options = {
    method: "POST",
    url: "/api/auth/getusernameexists",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(username),
  };

  axios(options)
    .then((response) => {
      dispatch({
        type: actions.USER_CHECKUSERNAME_SUCCESS,
        payload: response.data,
      });
    })
    .catch((e) => {
      // console.log(e);
      dispatch({ type: actions.USER_CHECKUSERNAME_FAIL });
    });
};
/* #endregion */

/* #region  Register New User Section */
export const register = (newUser, dispatch) => {
  const options = {
    method: "POST",
    url: "/api/auth/register",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(newUser),
  };

  axios(options)
    .then((response) => {
      dispatch({
        type: actions.USER_REGISTER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((e) => {
      // console.log(e);
      dispatch({ type: actions.USER_REGISTER_FAIL });
    });
};
/* #endregion */

/* #region  Login Existing User Section */
export const login = (loginCredentials, dispatch) => {
  const options = {
    method: "POST",
    url: "/api/auth/login",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(loginCredentials),
  };

  axios(options)
    .then((response) => {
      dispatch({
        type: actions.USER_LOGIN_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem('role', response.data.objLoggedInUser.role)
    })
    .catch((e) => {
      alert(e.response.data)
      dispatch({ type: actions.USER_LOGIN_FAIL });
    });
};

export const ldapLogin = (loginCredentials, dispatch) => {
  
  const options = {
    method: "POST",
    url: "/api/auth/ldaplogin",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(loginCredentials),
  };

  axios(options)
    .then((response) => {
      dispatch({
        type: actions.USER_LOGIN_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem('role', response.data.objLoggedInUser.role)
    })
    .catch((e) => {
      alert(e.response.data);
      dispatch({ type: actions.USER_LOGIN_FAIL });
    });
};
/* #endregion */

export const signout = (token, dispatch) => {
  axios
    .post("/api/auth/signout", null, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((response) => {
      dispatch({ type: actions.USER_LOGOUT_SUCCESS });
    })
    .catch((e) => {
      // console.log(e);
    });
};
