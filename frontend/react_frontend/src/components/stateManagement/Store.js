// Redux
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Components
import CombinedReducers from "./reducers/";

// Dev Tools
import { composeWithDevTools } from "redux-devtools-extension";

const objInitialState = {};
const middleware = [thunk];

export const Store = createStore(
  CombinedReducers,
  objInitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
