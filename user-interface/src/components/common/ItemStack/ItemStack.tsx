import React from "react";
import { Badge, HStack, Pressable, Text, View } from "native-base";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";
import Styles from "./ItemStack.style";
import { CustomColors } from "../../../styles/colors";

interface RequiredProps {
  iconName: string;
  itemName: string;
  selected: boolean;
  onPress: Function;
}

interface OptionalProps {
  badgeMsg: string | null;
  badgeColorScheme: "success" | "danger" | "info" | "coolGray" | null;
  badgeVariant: "solid" | "outline" | "subtle" | null;
  background: string;
  textColor: string;
}

export interface ItemStackProps extends RequiredProps, OptionalProps {}

const defaultProps: OptionalProps = {
  badgeMsg: null,
  badgeColorScheme: "info",
  badgeVariant: "solid",
  background: CustomColors.blackTransparent,
  textColor: CustomColors.white,
};

const ItemStack = (props: ItemStackProps) => {
  const renderBadge = () => {
    if (!props.badgeMsg) return <View />;
    return (
      <Badge variant={props.badgeVariant} colorScheme={props.badgeColorScheme}>
        {props.badgeMsg}
      </Badge>
    );
  };
  const bg = props.badgeVariant === "outline" ? "white" : props.background;
  const bgSelected = props.selected ? "rgba(227,157,73,0.58)" : "transparent";
  return (
    <Pressable
      onPress={() => props.onPress()}
      bg={bgSelected}
      style={Styles._container}
    >
      <HStack justifyContent={"space-between"} background={props.background}>
        <View style={Styles._description}>
          <View style={Styles._shadow}>
            <FontAwesomeIcon
              name={props.iconName}
              size={20}
              style={Styles._icon}
              color={props.textColor}
            />
          </View>

          <Text
            fontSize={15}
            style={Styles._textDescription}
            color={props.textColor}
          >
            {props.itemName}
          </Text>
        </View>
        <View background={bg} style={Styles._badge}>
          {renderBadge()}
        </View>
      </HStack>
    </Pressable>
  );
};

ItemStack.defaultProps = defaultProps;

export default ItemStack;
