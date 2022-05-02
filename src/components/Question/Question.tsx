import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Question as QuestionObj } from "../../interfaces/question";
import OptionButton from "../OptionButton";
import { styles } from "./styles";

interface Props {
  selected: string | null;
  selectOption: (id: string) => void;
  question: QuestionObj;
}

const Question = ({ question, selectOption, selected }: Props) => {
  return (
    <>
      <Text style={styles.title}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options?.map((option) => (
          <OptionButton
            key={option.id}
            title={option.text}
            imgUrl={option.image}
            onPress={() => selectOption(option.id)}
            isSelected={selected === option.id}
          />
        ))}
      </View>
    </>
  );
};

export default Question;
