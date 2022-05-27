import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import ComponentMenuView from "../views/ComponentMenuView/ComponentMenuView";
import LoginForm from "../components/LoginForm/LoginForm";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/ComponentMenuView">
        <ComponentMenuView />
      </ComponentPreview>
        <ComponentPreview path="/LoginForm">
            <LoginForm/>
        </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
