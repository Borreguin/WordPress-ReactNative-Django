import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n/config"; // Allows translation
import "./utils/icons"; // To use icons across the application
import store, { persistor } from "./store/store"; // Adding redux store to React
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Provide the store to the application
import { routing } from "./views/Routing";
import { configTheme, defaultTheme } from "./styles/theme";
import { NativeBaseProvider } from "native-base";

window.onload = renderThisComponent;

function renderThisComponent() {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider theme={defaultTheme} config={configTheme}>
            {routing}
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
