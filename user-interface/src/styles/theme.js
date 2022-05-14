import { extendTheme, useBreakpointValue } from "native-base";
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
    background: {
      default: background.default,
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
});

export const configTheme = {
  dependencies: {
    "linear-gradient": require("react-native-web-linear-gradient").default,
  },
};

// Breakpoints:
export const bkpColumnToRow = {
  base: "column",
  sm: "column",
  md: "column",
  lg: "row",
  xl: "row",
};

export const bkpCentralPanel = {
  base: "98%",
  sm: "98%",
  md: "55%",
  lg: "45%",
  xl: "40%",
};

export const bkpLeftMargin = {
  md: "20%",
};
