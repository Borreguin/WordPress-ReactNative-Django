import React, { useEffect, useState } from "react";
import {
  Alert,
  HStack,
  VStack,
  Text,
  IconButton,
  CloseIcon,
  View,
} from "native-base";

interface AlertProps {
  msg: string | null;
}

function BlackAlert({ msg }: AlertProps) {
  const [seeAlert, setSeeAlert] = useState(true);
  useEffect(() => {
    setSeeAlert(true);
    return () => {
      setSeeAlert(false);
    };
  }, [msg]);

  if (msg == null || msg.length === 0 || !seeAlert) return <View />;
  return (
    <Alert w="100%" bgColor={"black"} zIndex={50000}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="white">
              {msg}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" color="coolGray.600" />}
            onPress={() => setSeeAlert(false)}
          />
        </HStack>
      </VStack>
    </Alert>
  );
}

export default BlackAlert;
