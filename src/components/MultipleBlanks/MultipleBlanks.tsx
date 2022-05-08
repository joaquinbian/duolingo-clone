import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Question } from "../../interfaces/question";
import OptionWord from "../OptionWord";
import { styles } from "./styles";

interface Props {
  question: Question;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

let indexQuestion = 0;
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
    const indexToInsert: number = selectedWords?.indexOf(""); //buscamos el indice del espacio

    if (indexToInsert !== -1) {
      setSelectedWords((words) => {
        return [
          ...words?.splice(0, indexToInsert)!,
          word,
          ...words?.splice(indexToInsert)!,
        ];
      });
    }
  };

  const removeWord = (word: string) => {
    const indexWord = selectedWords?.indexOf(word);
    if (indexWord !== -1) {
      setSelectedWords((words) => {
        return [
          ...words?.splice(0, indexWord)!,
          "",
          ...words?.splice(indexWord)!,
        ];
      });
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
      <Text>{question.type}</Text>
    </View>
  );
};

export default MultipleBlanks;
