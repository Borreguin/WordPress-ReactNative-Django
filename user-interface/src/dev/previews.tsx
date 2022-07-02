import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import AuthenticatedView from "../views/AuthenticatedView/AuthenticatedView";
import LoginForm from "../components/LoginForm/LoginForm";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/AuthenticatedView">
        <AuthenticatedView />
      </ComponentPreview>
      <ComponentPreview path="/LoginForm">
        <LoginForm />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
