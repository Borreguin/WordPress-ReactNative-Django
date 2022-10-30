import React from "react";
import { RootState } from "../../store/store";
import { revokeToken, User } from "../../store/slices/loginSlice";
import { connect } from "react-redux";
import { Box, View } from "native-base";

interface SideBarProps {
  user: User;
  isLoggedIn: boolean;
}

const SideBar = (props: SideBarProps) => {
  if (props.isLoggedIn) return <View />;
  return <Box></Box>;
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch(revokeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
