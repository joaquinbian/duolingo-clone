import { Input } from "native-base";
import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import mascot from "../../../assets/images/mascot.png";
import { styles } from "./styles";
import { OpenEndedQuestion } from "../../interfaces/openEndedQuestion";
import Button from "../Button";

interface Props {
  question: OpenEndedQuestion;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}
const OpenEndedQuestions = ({
  question,
  onCorrectAnswer,
  onIncorrectAnswer,
}: Props) => {
  const [input, setInput] = useState("");

  const compareSentences = (input: string) => {
    const sentenceA = input.split(" ").join("").toLowerCase();
    const sentenceB = question.answer.split(" ").join("").toLowerCase();
    if (sentenceA === sentenceB) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  };
  return (
    <>
      <Text style={styles.title}>complete this sentence</Text>

      <View style={styles.sentenceContainer}>
        <Image resizeMode="contain" source={mascot} style={styles.mascot} />
        <Text style={styles.sentence}>{question.text}</Text>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder="type in English..."
        textAlignVertical="top"
        onChangeText={setInput}
        value={input}
      />
      <Button onPress={() => compareSentences(input)}>submit</Button>
    </>
  );
};

export default OpenEndedQuestions;
