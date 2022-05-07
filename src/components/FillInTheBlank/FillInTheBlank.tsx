import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Question } from "../../interfaces/question";
import Button from "../Button";
import OptionWord from "../OptionWord";
import { styles } from "./styles";

interface Props {
  question: Question;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

const FillInTheBlank = ({
  question,
  onCorrectAnswer,
  onIncorrectAnswer,
}: Props) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const selectWord = (word: string) => {
    setSelectedWord(word);
  };

  const removeWord = () => {
    setSelectedWord(null);
  };

  const checkAnswer = () => {
    const answer = question.parts?.find((part) => part.isBlank);

    if (answer?.text === selectedWord) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  };

  return (
    <View>
      <Text style={styles.title}>Complete de sentence</Text>
      <View style={styles.phraseContainer}>
        {question.parts?.map((part) =>
          !part.isBlank ? (
            <Text style={{ marginHorizontal: 10 }}>{part.text}</Text>
          ) : (
            <OptionWord word={selectedWord!} onPress={removeWord} />
          )
        )}
      </View>

      <View style={styles.optionsContainer}>
        {question.options?.map((option: string) => (
          <OptionWord
            key={option}
            word={option}
            onPress={() => selectWord(option)}
            selected={option === selectedWord}
          />
        ))}
      </View>
      <Button onPress={checkAnswer}>submit</Button>
    </View>
  );
};

export default FillInTheBlank;
