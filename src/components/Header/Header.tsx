import { Progress } from "native-base";
import React from "react";
import { View, Text, Image } from "react-native";
import heart from "../../../assets/images/heart.png";
import { styles } from "./styles";

interface Props {
  currentIndex: number;
  maxValue: number;
  lives: number | null;
}
const Header = ({ currentIndex, maxValue, lives }: Props) => {
  return (
    <View style={styles.container}>
      <Progress value={currentIndex} mx="4" max={maxValue} width="2xs" />
      <Image source={heart} style={styles.image} />
      <Text style={styles.lives}>{lives}</Text>
    </View>
  );
};
export default Header;
