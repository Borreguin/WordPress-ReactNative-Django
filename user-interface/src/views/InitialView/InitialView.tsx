import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import { configTheme, defaultTheme } from "../../styles/theme";
import LoginForm from "../../components/LoginForm/LoginForm";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { validateToken } from "../../store/slices/loginSlice";

const InitialView = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      <LoginForm onLogin={setLoggedIn} />
    </NativeBaseProvider>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginValidateTokenAction: () => dispatch(validateToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialView);
