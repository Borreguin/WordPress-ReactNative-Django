import React, { useState } from "react";
import { View, Text, Image, Pressable } from "native-base";
import Styles from "./Menu.style";
import { ImageSourcePropType } from "react-native";

type submenu = {
  title: String;
  action: Function;
};

interface MenuProps {
  menu: Array<submenu>;
  iconImageSource: ImageSourcePropType;
  iconSize: number;
}

export const Menu = (props: MenuProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { menu, iconImageSource, iconSize } = props;

  const renderSubMenu = () => {
    return menu.map((submenu, ix) => (
      <View key={ix}>
        <Text>{submenu.title}</Text>
      </View>
    ));
  };

  const renderIcon = () => {
    return (
      <Pressable
        style={Styles._menu}
        onPress={() => {
          console.log("open/close", openMenu);
          setOpenMenu(!openMenu);
        }}
      >
        <Image
          source={iconImageSource}
          resizeMode={"contain"}
          size={iconSize}
          alt={"Menu logo"}
        />
      </Pressable>
    );
  };

  return (
    <View>
      {renderIcon()}
      {openMenu ? renderSubMenu() : <View />}
    </View>
  );
};
