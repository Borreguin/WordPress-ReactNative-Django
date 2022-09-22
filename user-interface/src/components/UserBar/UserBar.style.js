import { StyleSheet } from "react-native";
import { defaultTheme } from "../../styles/theme";

export default StyleSheet.create({
  _UserBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    height: 52,
    overflow: "hidden",
    backgroundColor: defaultTheme.colors.background.dark,
  },
  _UserIdentifier: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    maxWidth: 450,
    minWidth: 250,
    height: "100%",
    overflow: "hidden",
    backgroundColor: defaultTheme.colors.enterprise.normal,
    borderTopEndRadius: 12,
    borderBottomEndRadius: 40,
  },
  _user_avatar_filled: {
    margin: 2,
  },
  _userName: {
    marginVertical: "auto",
    marginLeft: 7,
    marginRight: 140,
    textAlign: "left",
  },
  _userNameLabel: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: defaultTheme.colors.font.light,
    fontWeight: "900",
  },
  _sidebarButton: {
    backgroundColor: defaultTheme.colors.button.primary,
    marginVertical: "auto",
    padding: 10,
    cursor: "pointer",
  },
});

export const bgLinear = {
  linearGradient: {
    colors: [
      defaultTheme.colors.enterprise.light,
      defaultTheme.colors.enterprise.normal,
      defaultTheme.colors.enterprise.dim,
    ],
    start: [0.1, 1, 1],
    end: [1, 1],
  },
};
