import React, { useEffect, useState } from "react";
import ItemStack, { ItemStackProps } from "../../common/ItemStack/ItemStack";
import { View } from "native-base";
import { v1 as uuid1 } from "uuid";

export interface SectionProps {
  items: Array<ItemStackProps>;
  selectedItemId?: string | null;
  onChange?: Function;
  sectionId?: string | null;
}

const Section = (props: SectionProps) => {
  const [selectedIdx, setSelectedIdx] = useState(props.selectedItemId);
  const id = !props.sectionId ? `${uuid1()}` : props.sectionId;
  const sectionId = React.useRef(id);

  useEffect(() => {
    setSelectedIdx(props.selectedItemId);
  }, [props.selectedItemId]);

  const onItemPress = (it, idx, onPress: Function) => {
    setSelectedIdx(idx);
    onPress(it, idx);
    if (props.onChange) {
      props.onChange(it, idx);
    }
  };

  const renderItems = () => {
    return props.items.map((it, ix) => {
      const idx = `${ix}-${sectionId.current}`;
      return (
        <ItemStack
          key={idx}
          id={idx}
          iconName={it.iconName}
          itemName={it.itemName}
          selected={idx === selectedIdx}
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
