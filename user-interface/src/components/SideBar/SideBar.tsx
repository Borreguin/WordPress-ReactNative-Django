import React, { useState } from "react";
import { Box } from "native-base";
import Section, { SectionProps } from "./Section/Section";

interface SideBarProps {
  sections: Array<SectionProps>;
}

const SideBar = (props: SideBarProps) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const onChange = (it, idx) => {
    if (it && idx) {
      setSelectedItemId(idx);
    }
  };

  return (
    <Box>
      {props.sections.map((sct, ix) => {
        return (
          <Section
            key={ix}
            items={sct.items}
            selectedItemId={selectedItemId}
            onChange={onChange}
          />
        );
      })}
    </Box>
  );
};

export default SideBar;
