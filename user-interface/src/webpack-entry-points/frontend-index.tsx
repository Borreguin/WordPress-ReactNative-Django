// Entry point for front end
import React from "react";
import ReactDOM from "react-dom/client";
import "../i18n/config"; // Allows translation
import "../utils/icons"; // Allows to use icons across the application
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import InitialView from "../views/InitialView/InitialView";

window.onload = renderThisComponent;

function renderThisComponent() {
  const root_element = document.getElementById("frontend") as HTMLElement;
  if (root_element === null) {
    console.log("required frontend element div", root_element);
  } else {
    const root = ReactDOM.createRoot(root_element);
    console.log("Going to render in this", root);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <InitialView />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    );
  }
}
