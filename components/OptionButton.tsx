import { Image } from "native-base";
import React from "react";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { styles } from "../App.styles";

interface OptionButtonProps {
  imgUrl: string;
  title: string;
  onPress: () => void;
}

const OptionButton = ({ imgUrl, title, onPress }: OptionButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.optionContainer, styles.boxShadow]}
    >
      <Image source={{ uri: imgUrl }} size="xl" alt={`${title} image`} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionButton;
