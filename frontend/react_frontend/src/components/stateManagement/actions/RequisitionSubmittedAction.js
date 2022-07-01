import axios from "axios";
import * as actions from "./ActionTypes";

/* #region  Get username exists Section */
// Request is made to Django.
export const formSubmission = (newRequisition, dispatch) => {
    const options = {
        method: "POST",
        url: "api/auth/requisition",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(newRequisition),
    }
    // Axios returns a Promise, resolving with either a Response object or Error object.
    axios(options)
      .then((response) => {
        // Redux is used to dispatch a particular action to its subsequent reducer and set new state.
        dispatch({
          type: actions.DATA_SENT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((e) => {
        // console.log(e);
        dispatch({ type: actions.DATA_SENT_FAIL });
      });
    };
  /* #endregion */