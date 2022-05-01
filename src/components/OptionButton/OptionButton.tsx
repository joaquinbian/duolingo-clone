import { Image } from "native-base";
import React, { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { styles as globalStyles } from "../../../App.styles";

interface OptionButtonProps {
  imgUrl: string;
  title: string;
  onPress: () => void;
  isSelected: boolean | null;
}

const OptionButton = ({
  imgUrl: uri,
  title,
  isSelected,
  onPress,
}: OptionButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.optionContainer,
        globalStyles.boxShadow,
        isSelected && styles.selectedOption,
      ]}
    >
      <Image
        source={{ uri }}
        size="2xl"
        alt={`${title} image`}
        resizeMode="contain" //para que el contenido de la imagen se muestre completo
      />
      <Text style={isSelected ? { fontWeight: "bold" } : {}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionButton;
