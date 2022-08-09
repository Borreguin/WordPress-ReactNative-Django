import React from "react";
import { routes } from "./Routing";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";
import { NativeBaseProvider, VStack, View, Container } from "native-base";
import { configTheme, defaultTheme } from "../styles/theme";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  Container: {
    marginTop: "3px",
    marginHorizontal: "5px",
    padding: "5px",
    backgroundColor: "rgba(213,213,213,0.87)",
    maxWidth: "100%",
    borderRadius: 5,
  },
});

export const RenderComponentList = () => {
  const create_links = () => {
    return (
      <View w={"100%"}>
        {routes.map((item, ix) => (
          <Container key={ix} style={Styles.Container}>
            <View display={"inline"}>
              <FontAwesomeIcon
                name="code"
                size={18}
                style={{ marginRight: "7px" }}
              />
              <a href={item.path}>
                <span className="menu-text">{item.description}</span>
              </a>
            </View>
          </Container>
        ))}
      </View>
    );
  };

  return (
    <NativeBaseProvider theme={defaultTheme} config={configTheme}>
      <VStack space={1} alignItems="center">
        {create_links()}
      </VStack>
    </NativeBaseProvider>
  );
};
