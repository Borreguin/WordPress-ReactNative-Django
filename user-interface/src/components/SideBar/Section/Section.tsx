import React, { useState } from "react";
import ItemStack, { ItemStackProps } from "../../common/ItemStack/ItemStack";
import { View } from "native-base";

interface RequiredProps {
  items: Array<ItemStackProps>;
}

export interface SectionProps extends RequiredProps {}

const Section = (props: SectionProps) => {
  const [selectedItem, setSelectedItem] = useState();

  const onItemPress = (it, ix, onPress: Function) => {
    setSelectedItem(it);
    onPress(it, ix);
  };

  const renderItems = () => {
    return props.items.map((it, idx) => {
      return (
        <ItemStack
          key={idx}
          iconName={it.iconName}
          itemName={it.itemName}
          selected={it === selectedItem}
          onPress={() => {
            onItemPress(it, idx, it.onPress);
          }}
          badgeMsg={it.badgeMsg}
          badgeColorScheme={it.badgeColorScheme}
          badgeVariant={it.badgeVariant}
          background={it.background}
          textColor={it.textColor}
        />
      );
    });
  };

  return <View>{renderItems()}</View>;
};

export default Section;
