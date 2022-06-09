// Entry point for front end
import React from "react";
import ReactDOM from "react-dom/client";
import InitialView from "../views/InitialView/InitialView";
import "../i18n/config"; // Allows translation
import "../utils/icons"; // To use icons across the application
import store, { persistor } from "../store/store"; // Adding redux store to React
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Provide the store to the application

const root = ReactDOM.createRoot(
  document.getElementById("front-end") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitialView />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
