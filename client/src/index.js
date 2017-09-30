import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./Store";
import Router from "./Router";
import ThemeProvider from "./containers/ThemeProvider";

// TURN OFF WARNINGS
console.disableYellowBox = true;

const SnackChan = () => (
  <ReduxProvider store={Store}>
    <ThemeProvider>
      <Router onNavigationStateChange={null} />
    </ThemeProvider>
  </ReduxProvider>
);

export default SnackChan;
