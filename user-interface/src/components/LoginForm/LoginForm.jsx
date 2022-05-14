import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Stack,
  useBreakpointValue,
  View,
  VStack,
} from "native-base";
import Styles from "./LoginForm.style";
import { useTranslation } from "react-i18next";
import { background } from "../../styles/colors";
import { bkpColumnToRow, bkpCentralPanel } from "../../styles/theme";
import { MaterialIcons } from "@expo/vector-icons";

const LoginForm = (props) => {
  const { t } = useTranslation();
  const flexDir = useBreakpointValue(bkpColumnToRow);
  const centralPanel = useBreakpointValue(bkpCentralPanel);
  const [show, setShow] = React.useState(false);

  const LoginSection = (
    <FormControl isRequired>
      <VStack>
        <FormControl.Label>{t("username")}</FormControl.Label>
        <Input placeholder={t("usernameHolder")} />
        <FormControl.Label>{t("password")}</FormControl.Label>
        <Input
          type={show ? "text" : "password"}
          placeholder={t("passwordHolder")}
          InputRightElement={
            <Icon
              as={MaterialIcons}
              name="visibility"
              size={5}
              mr="2"
              color="muted.400"
              onPress={() => setShow(!show)}
            ></Icon>
          }
        />
        <Divider my="1" bg={"transparent.100"} />
        <Button>{t("login")}</Button>
      </VStack>
    </FormControl>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: flexDir,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          bg={background.default}
          style={[Styles.LoginForm]}
          w={centralPanel}
        >
          {LoginSection}
        </Box>
        <Center
          bg={background.default}
          style={[Styles.LoginForm]}
          w={centralPanel}
        >
          {LoginSection}
        </Center>
      </View>
    </ScrollView>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
