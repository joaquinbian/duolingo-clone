import { Button } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

interface CustomButtonProps extends InterfaceButtonProps {
  title: string;
}

const CustomButton = ({ title, ...rest }: CustomButtonProps) => {
  return <Button {...rest}>{title}</Button>;
};

export default CustomButton;

const styles = StyleSheet.create({});
