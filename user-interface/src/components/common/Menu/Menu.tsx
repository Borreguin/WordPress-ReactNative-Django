import React, { useState } from "react";
import { View, Text, Image } from "native-base";
import Styles from "./Menu.style";
import {
  ImageSourcePropType,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";

type submenu = {
  title: String;
  action: Function;
};

interface MenuRequiredProps {
  menu: Array<submenu>;
  iconImageSource: ImageSourcePropType;
  iconSize: number;
}

interface MenuOptionalProps {
  bg: string;
  fontSize: number;
  textColor: string;
  menuSize: number;
}

interface MenuProps extends MenuRequiredProps, MenuOptionalProps {}

const defaultProps: MenuOptionalProps = {
  bg: "#000000",
  fontSize: 18,
  textColor: "#ffffff",
  menuSize: 150,
};

const Menu = (props: MenuProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { menu, iconImageSource, iconSize, bg, fontSize, textColor, menuSize } =
    props;
  const [menuLeft, setMenuLeft] = useState(0);
  const [menuTop, setMenuTop] = useState(0);

  const renderSubMenu = () => {
    return menu.map((submenu, ix) => (
      <TouchableOpacity key={ix} onPress={() => submenu.action()}>
        <View style={Styles._submenu} bg={bg} width={menuSize}>
          <Text fontSize={fontSize} color={textColor}>
            {submenu.title}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderIcon = () => {
    return (
      <TouchableOpacity
        style={Styles._menu}
        onPress={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <Image
          source={iconImageSource}
          resizeMode={"contain"}
          size={iconSize}
          alt={"Menu logo"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        onLayout={(e: LayoutChangeEvent) => {
          const layout = e.nativeEvent.layout;
          setMenuLeft(layout["left"] + 2 + layout.width - menuSize);
          setMenuTop(layout["top"] + 2 + layout.height);
        }}
      >
        {renderIcon()}
      </View>
      <View style={Styles._submenuContainer} top={menuTop} left={menuLeft}>
        {openMenu ? renderSubMenu() : <View />}
      </View>
    </View>
  );
};

Menu.defaultProps = defaultProps;

export default Menu;
