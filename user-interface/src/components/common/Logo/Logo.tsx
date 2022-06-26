import React from "react";
import { Image, useBreakpointValue } from "native-base";
import LogoImage from "../../../resources/images/logo.png";
import { bkpBigImage } from "../../../styles/breakpoints";

export const Logo = () => {
  const logoSize = useBreakpointValue(bkpBigImage);
  return (
    <Image
      source={{ uri: LogoImage }}
      resizeMode={"contain"}
      size={logoSize}
      alt={"Logo"}
    />
  );
};
