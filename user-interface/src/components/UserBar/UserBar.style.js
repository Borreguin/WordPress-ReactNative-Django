import { StyleSheet } from "react-native";
import { defaultTheme } from "../../styles/theme";

export default StyleSheet.create({
  _UserBar: {
    position: "absolute",
    width: "100%",
    height: 38,
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  _UserIdentifier: {
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
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: 20,
    margin: 1,
    border: "solid",
    color: "white",
  },
  _iconUserStyle: {
    backgroundColor: "transparent",
    alignItems: "center",
    margin: -1,
  },
  _userName: {
    minWidth: "40%",
    marginLeft: 40,
    margin: "auto",
    textAlign: "left",
    overflow: "hidden",
  },
  _userNameLabel: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: defaultTheme.colors.font.light,
    fontWeight: "900",
  },
  _inverseLogo: {
    position: "absolute",
    width: 20,
    height: 28,
    borderRadius: 0,
    opacity: 1,
    right: 7,
    top: 2,
  },
  _menu: {
    position: "absolute",
    right: 7,
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
