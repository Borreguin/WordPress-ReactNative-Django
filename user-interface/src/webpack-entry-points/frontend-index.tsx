// Entry point for front end
import React from "react";
import ReactDOM from "react-dom/client";
import "../i18n/config"; // Allows translation
import "../utils/icons";
// import store, { persistor } from "../store/store";
// import { PersistGate } from "redux-persist/integration/react";
// import InitialView from "../views/InitialView/InitialView"; // To use icons across the application
// import { Provider } from "react-redux";
// import { Text } from "native-base";

window.onload = renderThisComponent;

function renderThisComponent() {
  const root_element = document.getElementById("frontend") as HTMLElement;
  if (root_element === null) {
    console.log("required frontend element div", root_element);
  } else {
    const root = ReactDOM.createRoot(root_element);
    console.log("Going to render in", root);
    root.render(
      <React.StrictMode>
        <div>This an example</div>
      </React.StrictMode>
    );
  }
}
