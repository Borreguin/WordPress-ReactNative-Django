import React, { useState } from "react";
import { NativeBaseProvider, Text, View } from "native-base";
import { configTheme, defaultTheme } from "../../styles/theme";
import LoginForm from "../../components/LoginForm/LoginForm";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { validateToken } from "../../store/slices/loginSlice";

const AuthenticatedView = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      {!loggedIn ? (
        <LoginForm onLogin={setLoggedIn} />
      ) : (
        <View h={"500px"}>
          <Text>Authenticated</Text>
        </View>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedView);
