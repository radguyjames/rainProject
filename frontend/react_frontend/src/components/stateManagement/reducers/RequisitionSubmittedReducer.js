import * as actions from '../actions/ActionTypes'

const objInitialState = {
    token: localStorage.getItem("token"),
    boolIsLoading: false,
    boolIsAuthenticated: false,
    objLoggedInUser: null,
    objUsernameExists: false,
  };
  
  export const RequisitionSubmittedReducer = (
    state = objInitialState,
    action
  ) => {
    switch (action.type) {
      case actions.DATA_SENT_SUCCESS:
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          ...action.payload,
          boolIsLoading: false,
          boolIsAuthenticated: true,
        };
  
      case actions.DATA_SENT_FAIL:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          boolIsLoading: false,
          boolIsAuthenticated: false,
          objLoggedInUser: null,
          objUsernameExists: false,
        };
      default:
        return state;
    }
  };
  