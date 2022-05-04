import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Alert } from "react-native";
import { styles } from "./App.styles";
import questions from "./assets/data/allQuestions";
import { useEffect, useRef, useState } from "react";
import Question from "./src/components/Question";
import {
  Question as QuestionInterface,
  Option,
} from "./src/interfaces/question";
import OpenEndedQuestions from "./src/components/OpenEndedQuestions";

export default function App() {
  // const [isChecking, setIsChecking] = useState<boolean | undefined>(undefined);
  const [selected, setSelected] = useState<Option | null>(null); //este estado lo puedo pasar directamnte al omponente
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionInterface>(
    questions[currentIndex]
  );

  const selectOption = (option: Option): void => setSelected(option);

  useEffect(() => {
    if (currentIndex === questions.length) {
      Alert.alert("congratulations", "you won");
    } else {
      setCurrentQuestion(questions[currentIndex]);
    }
    setSelected(null);
  }, [currentIndex]);

  const OnCorrectAnswer = () => {
    Alert.alert("correct", "", [
      {
        text: "next",
        onPress: () => setCurrentIndex((index) => index + 1),
      },
    ]);
  };

  const onIncorrectAnswer = () => {
    Alert.alert("incorrect");
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        {currentQuestion.type === "IMAGE_MULTIPLE_CHOICE" ? (
          <Question
            question={currentQuestion}
            selected={selected}
            selectOption={selectOption}
            onCorrect={OnCorrectAnswer}
            onWrong={onIncorrectAnswer}
          />
        ) : (
          <OpenEndedQuestions
            onCorrectAnswer={OnCorrectAnswer}
            onIncorrectAnswer={onIncorrectAnswer}
            question={currentQuestion}
          />
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
