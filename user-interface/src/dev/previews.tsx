import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import InitialView from "../views/InitialView/InitialView";
import LoginForm from "../components/LoginForm/LoginForm";
import App from "../App";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/InitialView">
        <InitialView />
      </ComponentPreview>
      <ComponentPreview path="/LoginForm">
        <LoginForm />
      </ComponentPreview>
        <ComponentPreview path="/App">
            <App/>
        </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
