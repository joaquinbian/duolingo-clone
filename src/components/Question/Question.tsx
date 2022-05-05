import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Question as QuestionInterface,
  Option,
} from "../../interfaces/question";
import Button from "../Button";
import OptionButton from "../OptionButton";
import { styles } from "./styles";

interface Props {
  question: QuestionInterface;
  onWrong: () => void;
  onCorrect: () => void;
}

const Question = ({ question, onCorrect, onWrong }: Props) => {
  const [selected, setSelected] = useState<Option | null>();

  const selectOption = (option: Option): void => setSelected(option);

  const onCheck = () => {
    if (selected?.correct) {
      onCorrect();
      setSelected(null);
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
