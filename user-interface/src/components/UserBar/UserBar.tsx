import React, { useState } from "react";
import {
  View,
  Text,
  Box,
  NativeBaseProvider,
  Avatar,
  Image,
} from "native-base";
import Styles from "./UserBar.style";
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

interface UserBarProps {
  userName: string;
  isLoggedIn: boolean;
  onSideBarClick: Function;
}

const UserBar = (props: UserBarProps) => {
  const { userName, isLoggedIn, onSideBarClick } = props;
  const [openSideBar, setOpenSideBar] = useState(false);

  const renderSidebarButton = () => {
    if (!isLoggedIn) return <View />;
    return (
      <Box style={Styles._sidebarButton}>
        <TouchableOpacity
          onPress={() => {
            onSideBarClick(!openSideBar);
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
    );
  };

  const renderUserIdentifier = () => {
    return (
      <Box style={Styles._UserIdentifier}>
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
    );
  };

  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      <View style={Styles._UserBar}>
        {renderUserIdentifier()}
        {renderSidebarButton()}
      </View>
    </NativeBaseProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    userName: state.login.user?.display_name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch(revokeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);
