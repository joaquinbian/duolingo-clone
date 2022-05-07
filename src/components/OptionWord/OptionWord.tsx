import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
interface Props {
  word: string;
  selected?: boolean;
  onPress: () => void;
}
const OptionWord = ({ word, onPress, selected }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.optionContainer, selected && styles.optionSelected]}
    >
      <Text style={selected ? styles.textSelected : { color: "black" }}>
        {word}
      </Text>
    </TouchableOpacity>
  );
};

export default OptionWord;
