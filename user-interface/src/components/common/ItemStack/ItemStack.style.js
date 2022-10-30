import { StyleSheet } from "react-native";

export default StyleSheet.create({
  _container: {
    display: "flex",
    padding: 1,
    width: "100%",
    maxWidth: 500,
    minWidth: 100,
    justifyContent: "space-between",
  },
  _description: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    minWidth: "40%",
    paddingHorizontal: 3,
  },
  _icon: {
    width: 30,
    height: 30,
    paddingTop: 5,
    paddingLeft: 5,
  },
  _shadow: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "50%",
  },
  _textDescription: {
    marginVertical: "auto",
    paddingHorizontal: 7,
  },
  _badge: {
    marginVertical: "auto",
    marginRight: 4,
  },
});
