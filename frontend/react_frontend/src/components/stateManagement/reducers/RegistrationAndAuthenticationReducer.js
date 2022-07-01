import * as actions from "../actions/ActionTypes";

const objInitialState = {
  token: localStorage.getItem("token"),
  boolIsLoading: false,
  boolIsAuthenticated: false,
  objLoggedInUser: null,
  objUsernameExists: false,
};

export const RegistrationAndAuthenticationReducer = (
  state = objInitialState,
  action
) => {
  switch (action.type) {
    case actions.USER_REGISTER_SUCCESS:
    case actions.USER_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        boolIsLoading: false,
        boolIsAuthenticated: true,
      };

    case actions.USER_REGISTER_FAIL:
    case actions.USER_LOGIN_FAIL:
    case actions.USER_CHECKUSERNAME_FAIL:
    case actions.USER_LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        boolIsLoading: false,
        boolIsAuthenticated: false,
        objLoggedInUser: null,
        objUsernameExists: false,
      };

    case actions.USER_CHECKUSERNAME_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
