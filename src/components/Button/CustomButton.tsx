import { Button } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

type Children = string | JSX.Element | JSX.Element[];

interface CustomButtonProps extends InterfaceButtonProps {
  children?: Children;
}

const CustomButton = ({ children, ...rest }: CustomButtonProps) => {
  return <Button {...rest}>{children}</Button>;
};

export default CustomButton;

const styles = StyleSheet.create({});
