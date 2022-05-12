import { Box, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { Button, Text } from "react-native";
import { defaultTheme } from "../../styles/theme";

const ComponentMenuView = () => {
  const [counter, setCounter] = useState(0);
  return (
    <NativeBaseProvider theme={defaultTheme}>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        Hello world
      </Box>
      <Text>Hello this is an example. Im so happy: {counter}</Text>
      <Button title={"TEST ME"} onPress={() => setCounter(counter + 1)} />
    </NativeBaseProvider>
  );
};

export default ComponentMenuView;
