import React, { useEffect, useState } from "react";
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

const areEqual = (arr1: string[] = [], arr2: string[] = []) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const MultipleBlanks = ({
  question,
  onCorrectAnswer,
  onIncorrectAnswer,
}: Props) => {
  const [selectedWords, setSelectedWords] = useState<string[]>();
  useEffect(() => {
    setSelectedWords(
      question.parts?.map((part) => (part.isBlank ? "" : part.text))
    );
  }, []);

  const addWord = (word: string) => {
    // setSelectedWords(words => words?.splice(index, 0, word));
    const indexToInsert: number | undefined = selectedWords?.indexOf(""); //buscamos el indice del espacio

    if (indexToInsert !== -1) {
      setSelectedWords((words) => {
        return [
          ...words?.splice(0, indexToInsert),
          word,
          ...words?.splice(indexToInsert),
        ];
      });
    }
  };

  const removeWord = (word: string) => {
    const indexWord = selectedWords?.indexOf(word);
    if (indexWord !== -1) {
      setSelectedWords((words) => {
        return [
          ...words?.splice(0, indexWord),
          "",
          ...words?.splice(indexWord),
        ];
      });
    }
  };

  const checkAnswer = () => {
    const sentence = question.parts?.map((part) => part.text);
    if (areEqual(selectedWords, sentence)) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  };

  console.log({ selectedWords });

  return (
    <View>
      <View style={styles.phrasesContainer}>
        {selectedWords &&
          question.parts?.map((part, index) =>
            !part.isBlank ? (
              <Text style={{ marginHorizontal: 10 }}>{part.text}</Text>
            ) : (
              <OptionWord
                word={selectedWords![index]}
                onPress={() => removeWord(selectedWords![index])}
              />
            )
          )}
      </View>
      <View style={styles.phrasesContainer}>
        {question.options?.map((option: string) => (
          <OptionWord
            key={option}
            selected={selectedWords?.includes(option)}
            onPress={() => addWord(option)}
            word={option}
          />
        ))}
      </View>
      {/* <Text>{question.type}</Text> */}
      <Button onPress={checkAnswer}>submit</Button>
    </View>
  );
};

export default MultipleBlanks;
