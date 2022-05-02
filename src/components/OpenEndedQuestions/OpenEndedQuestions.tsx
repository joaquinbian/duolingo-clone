import { Input } from "native-base";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import mascot from "../../../assets/images/mascot.png";
import { styles } from "./styles";
const OpenEndedQuestions = () => {
  return (
    <ScrollView>
      <Text>complete this sentence</Text>

      <View style={styles.sentenceContainer}>
        <Image source={mascot} style={styles.mascot} />
        <Text style={styles.sentence}>sentence</Text>
      </View>
      <Input size="2xl" multiline placeholder="type in English..." />
    </ScrollView>
  );
};

export default OpenEndedQuestions;
