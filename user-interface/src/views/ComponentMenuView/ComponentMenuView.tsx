import { NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { Button, Text } from "react-native";
import { configTheme, defaultTheme } from "../../styles/theme";
import LoginForm from "../../components/LoginForm/LoginForm";

const ComponentMenuView = () => {
  const [counter, setCounter] = useState(0);
  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      <Text>Hello this is an example. Im so happy: {counter}</Text>
      <Button title={"TEST ME"} onPress={() => setCounter(counter + 1)} />
      <LoginForm />
    </NativeBaseProvider>
  );
};

export default ComponentMenuView;
