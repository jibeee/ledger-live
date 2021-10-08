import React from "react";
import styled from "styled-components/native";

import BaseModal, { BaseModalProps } from "@components/Layout/Modal/BaseModal";
import Text from "@components/Text";
import IconBox from "@components/Icon/IconBox";
import Button, { ButtonProps } from "@components/cta/Button";
import { StyleSheet } from "react-native";

const FooterButtonsContainer = styled.View`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  margin-top: auto;
  padding-top: 32px;
`;

const modalStyleOverrides = StyleSheet.create({
  container: {
    borderRadius: 4,
  },
});

export default function Popin({
  children,
  Icon,
  iconColor,
  leftButtonText = "Cancel",
  rightButtonText = "Delete",
  onLeftButtonPress,
  onRightButtonPress,
  ...restProps
}: BaseModalProps & {
  Icon: (props: { size?: number; color?: string }) => React.ReactElement;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonPress?: ButtonProps["onPress"];
  onRightButtonPress?: ButtonProps["onPress"];
}): React.ReactElement {
  return (
    <BaseModal
      {...restProps}
      containerStyle={modalStyleOverrides.container}
      Icon={Icon ? <IconBox Icon={Icon} color={iconColor} /> : null}
    >
      {children}
      <FooterButtonsContainer>
        <Button
          onPress={onLeftButtonPress}
          outline
          type={"shade"}
          style={{ flex: 1, marginRight: 8 }}
        >
          <Text>{leftButtonText}</Text>
        </Button>
        <Button onPress={onRightButtonPress} style={{ flex: 1 }}>
          <Text>{rightButtonText}</Text>
        </Button>
      </FooterButtonsContainer>
    </BaseModal>
  );
}
