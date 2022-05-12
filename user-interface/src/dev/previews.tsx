import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import ComponentMenuView from "../views/ComponentMenu/ComponentMenu.view";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/ComponentMenuView">
        <ComponentMenuView />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
