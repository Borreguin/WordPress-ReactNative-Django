// Entry point for Login
import React from "react";
import ReactDOM from "react-dom/client";
import "../i18n/config"; // Allows translation
import "../utils/icons"; // Allows to use icons across the application
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { configTheme, defaultTheme } from "../styles/theme";
import { NativeBaseProvider } from "native-base";
import LoggedInView from "../views/AuthenticatedView/AuthenticatedView";

const entryPointName = "ep_login";

const root_element = document.getElementById(entryPointName) as HTMLElement;

if (root_element === null) {
  console.log("div required for this component", entryPointName);
} else {
  const root = ReactDOM.createRoot(root_element);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider theme={defaultTheme} config={configTheme}>
            <LoggedInView />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
