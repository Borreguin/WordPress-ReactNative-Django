import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import InitialView from "../views/InitialView/InitialView";
import LoginForm from "../components/LoginForm/LoginForm";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/InitialView">
        <InitialView />
      </ComponentPreview>
      <ComponentPreview path="/LoginForm">
        <LoginForm />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
