import { AppRegistry } from "react-native";
import App from "../App";
const appName = "Testing web app";

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("app-root"),
});
