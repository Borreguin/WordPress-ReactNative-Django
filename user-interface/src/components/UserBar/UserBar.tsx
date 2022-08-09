import React from "react";
import { View, Text, Box, NativeBaseProvider } from "native-base";
import Styles, { bgLinear } from "./UserBar.style";
import { RootState } from "../../store/store";
import { revokeToken } from "../../store/slices/loginSlice";
import { connect } from "react-redux";
import inverseLogo from "../../resources/images/inverseLogo.png";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";
import { configTheme, defaultTheme } from "../../styles/theme";
import { Menu } from "../common/Menu/Menu";

const UserBar = () => {
  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      <View style={Styles._UserBar}>
        <Box style={Styles._UserIdentifier} bg={bgLinear}>
          <View style={Styles._user_avatar_filled}>
            <FontAwesomeIcon
              name="user-circle"
              size={31}
              style={Styles._iconUserStyle}
              inverse={false}
            />
          </View>
          <View style={Styles._userName}>
            <Text style={Styles._userNameLabel}>userName to long for this</Text>
          </View>
        </Box>

        <Box style={Styles._menu}>
          <Menu
            menu={[
              {
                title: "test",
                action: () => {
                  console.log("check");
                },
              },
            ]}
            iconImageSource={{ uri: inverseLogo }}
            iconSize={31}
          ></Menu>
        </Box>
      </View>
    </NativeBaseProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    loginMsg: state.login.message,
    userName: state.login.user?.display_name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch(revokeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);
