import { NativeBaseProvider } from "native-base";
import React from "react";
import { configTheme, defaultTheme } from "../../styles/theme";
import LoginForm from "../../components/LoginForm/LoginForm";

const ComponentMenuView = () => {
  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      <LoginForm />
    </NativeBaseProvider>
  );
};

export default ComponentMenuView;
