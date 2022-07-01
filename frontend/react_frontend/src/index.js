import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Redux
import { Provider } from "react-redux";

// Components
import { Store } from "./components/stateManagement/Store";
import { App } from "./App";

// Styles
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

// Customize theme style
let theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        // Make text unselectable
        html: {
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          MsUserSelect: "none",
          UserSelect: "none",
          OUserSelect: "none",
          minWidth: "1024px", // https://gist.github.com/gokulkrishh/242e68d1ee94ad05f488
        },
      },
    },
  },
});

// Renders the App component onto the root DOM node
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={Store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
