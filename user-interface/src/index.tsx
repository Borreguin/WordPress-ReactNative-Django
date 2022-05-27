import React from "react";
import ReactDOM from "react-dom/client";
import ComponentMenuView from "./views/ComponentMenuView/ComponentMenuView";
import reportWebVitals from "./reportWebVitals";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import "./i18n/config"; // Allows translation
import "./utils/icons"; // To use icons across the application
import store from "./store/store"; // Adding redux store to React
import { Provider } from "react-redux"; // Provide the store to the application

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <Provider store={store}>
        <ComponentMenuView />
      </Provider>
    </DevSupport>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
