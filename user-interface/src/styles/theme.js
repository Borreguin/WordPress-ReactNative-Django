import { extendTheme } from "native-base";
import { background } from "./colors";

export const defaultTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
    transparent: {
      0: "rgba(0,0,0,1)",
      50: "rgba(0,0,0,0.5)",
      100: "rgba(0,0,0,0)",
    },
    fontConfig: {
      Roboto: {
        100: {
          normal: "Roboto-Light",
          italic: "Roboto-LightItalic",
        },
        200: {
          normal: "Roboto-Light",
          italic: "Roboto-LightItalic",
        },
        300: {
          normal: "Roboto-Light",
          italic: "Roboto-LightItalic",
        },
        400: {
          normal: "Roboto-Regular",
          italic: "Roboto-Italic",
        },
        500: {
          normal: "Roboto-Medium",
        },
        600: {
          normal: "Roboto-Medium",
          italic: "Roboto-MediumItalic",
        },
      },
    },

    background: {
      default: background.default,
    },
  },
  config: {
    // Changing initialColorMode to 'dark' / 'light'
    initialColorMode: "light",
  },
});

export const configTheme = {
  dependencies: {
    "linear-gradient": require("react-native-web-linear-gradient").default,
  },
};
