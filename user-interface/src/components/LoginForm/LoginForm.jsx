import React from "react";
import {
  Button,
  Center,
  Divider,
  FormControl,
  Input,
  ScrollView,
  useBreakpointValue,
  View,
  VStack,
} from "native-base";
import Styles from "./LoginForm.style";
import { useTranslation } from "react-i18next";
import { background } from "../../styles/colors";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

import { bkpCentralPanel, bkpColumnToRow } from "../../styles/breackpoints";
import { HSeparator } from "../Separators/Separators";
import { Logo } from "../Logo/Logo";

const LoginForm = () => {
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
            <FontAwesomeIcon
              name="eye-slash"
              size={24}
              onPress={() => setShow(!show)}
              style={{ marginRight: 1 }}
            />
          }
        />
        <Divider my="2" bg={"transparent.100"} />
        <Button>{t("login")}</Button>
      </VStack>
    </FormControl>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} minH={"93vh"}>
      <View
        style={{
          flexDirection: flexDir,
          justifyContent: "center",
          alignItems: "center",
        }}
        minH={"93vh"}
      >
        <Center p={0} w={centralPanel}>
          <Logo />
        </Center>
        <HSeparator />
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
