import { Button as NativeButton } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

type Children = string | JSX.Element | JSX.Element[];

interface CustomButtonProps extends InterfaceButtonProps {
  children?: Children;
}

const Button = ({ children, ...rest }: CustomButtonProps) => {
  return <NativeButton {...rest}>{children}</NativeButton>;
};

export default Button;

const styles = StyleSheet.create({});
