import React from "react";
import { CustomColors } from "../../../styles/colors";
import { useBreakpointValue, View } from "native-base";
import { bkpHSeparator } from "../../../styles/breakpoints";

export const HSeparator = () => {
  const bkpH = useBreakpointValue(bkpHSeparator);
  return <View bg={CustomColors.transparent} h={bkpH} w={"1%"} />;
};
