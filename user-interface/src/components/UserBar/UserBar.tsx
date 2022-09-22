import React, { useState } from "react";
import {
  View,
  Text,
  Box,
  NativeBaseProvider,
  Avatar,
  Image,
} from "native-base";
import Styles, { bgLinear } from "./UserBar.style";
import { RootState } from "../../store/store";
import { revokeToken } from "../../store/slices/loginSlice";
import { connect } from "react-redux";
import inverseLogo from "../../resources/images/inverseLogo.png";
import { configTheme, defaultTheme } from "../../styles/theme";
import {
  displayAbbreviation,
  selectColorForThisName,
} from "../../utils/common";
import { TouchableOpacity } from "react-native";

const UserBar = (props) => {
  console.log(props);
  // const { userName } = props;
  const userName = "Pablo Andrade";
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      <View style={Styles._UserBar}>
        <Box style={Styles._UserIdentifier} bg={bgLinear}>
          <View style={Styles._user_avatar_filled}>
            <Avatar
              source={{ uri: "https://" }}
              bg={selectColorForThisName(userName)}
            >
              {displayAbbreviation(userName)}
            </Avatar>
          </View>
          <View style={Styles._userName}>
            <Text isTruncated style={Styles._userNameLabel}>
              {userName}
            </Text>
          </View>
        </Box>

        <Box style={Styles._sidebarButton}>
          <TouchableOpacity
            onPress={() => {
              setOpenSideBar(!openSideBar);
            }}
          >
            <Image
              source={{ uri: inverseLogo }}
              resizeMode={"contain"}
              size={31}
              alt={"Menu logo"}
            />
          </TouchableOpacity>
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
