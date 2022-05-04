import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Question as QuestionInterface,
  Option,
} from "../../interfaces/question";
import Button from "../Button";
import OptionButton from "../OptionButton";
import { styles } from "./styles";

interface Props {
  selected: Option | null;
  selectOption: (option: Option) => void;
  question: QuestionInterface;
  onWrong: () => void;
  onCorrect: () => void;
}

const Question = ({
  question,
  selectOption,
  selected,
  onCorrect,
  onWrong,
}: Props) => {
  const onCheck = () => {
    if (selected?.correct) {
      onCorrect();
    } else {
      onWrong();
    }
  };
  return (
    <>
      <Text style={styles.title}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options?.map((option) => (
          <OptionButton
            key={option.id}
            title={option.text}
            imgUrl={option.image}
            onPress={() => selectOption(option)}
            isSelected={selected?.id === option.id}
          />
        ))}
      </View>
      <Button onPress={onCheck}>check</Button>
    </>
  );
};

export default Question;
