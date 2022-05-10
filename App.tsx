import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./App.styles";
import questions from "./assets/data/allQuestions";
import Question from "./src/components/Question";
import OpenEndedQuestions from "./src/components/OpenEndedQuestions";
import { QuestionType } from "./src/interfaces/question";
import Header from "./src/components/Header";
import FillInTheBlank from "./src/components/FillInTheBlank";
import MultipleBlanks from "./src/components/MultipleBlanks";
import { useQuestion } from "./src/hooks/useQuestion";
import { useLives } from "./src/hooks/useLives";

const MULTIPLE_CHOICE: QuestionType = "IMAGE_MULTIPLE_CHOICE";
const OPEN_ENDED: QuestionType = "OPEN_ENDED";
const FILL_IN_THE_BLANK: QuestionType = "FILL_IN_THE_BLANK";
const FILL_IN_THE_BLANK_MULTIPLE: QuestionType = "FILL_IN_THE_BLANK_MULTIPLE";

export default function App() {
  const {
    currentQuestion,
    currentIndex,
    isLoading,
    nextQuestion,
    resetQuestions,
  } = useQuestion();

  const { lives, decrementLives, resetLives } = useLives();

  const restartGame = () => {
    resetLives();
    resetQuestions();
  };

  const OnCorrectAnswer = () => {
    Alert.alert("correct", "", [
      {
        text: "next",
        onPress: () => nextQuestion(),
      },
    ]);
  };

  const onIncorrectAnswer = () => {
    if (lives === 1) {
      Alert.alert("Game Over", "Try again", [
        {
          text: "try again",
          onPress: () => restartGame(),
        },
      ]);
    } else {
      Alert.alert("incorrect");
      decrementLives();
    }
  };

  useEffect(() => {
    if (currentIndex === questions.length) {
      Alert.alert("congratulations", "you won", [
        {
          text: "restart",
          onPress: () => restartGame(),
        },
      ]);
    }
  }, [currentIndex]);

  console.log({ currentIndex, length: questions.length });

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        {isLoading ? (
          <ActivityIndicator color="green" />
        ) : (
          <>
            <Header
              currentIndex={currentIndex}
              maxValue={questions.length}
              lives={lives}
            />

            {currentQuestion.type === MULTIPLE_CHOICE && (
              <Question
                question={currentQuestion}
                onCorrect={OnCorrectAnswer}
                onWrong={onIncorrectAnswer}
              />
            )}

            {currentQuestion.type === OPEN_ENDED && (
              <OpenEndedQuestions
                onCorrectAnswer={OnCorrectAnswer}
                onIncorrectAnswer={onIncorrectAnswer}
                question={currentQuestion}
              />
            )}
            {currentQuestion.type === FILL_IN_THE_BLANK && (
              <FillInTheBlank
                onCorrectAnswer={OnCorrectAnswer}
                onIncorrectAnswer={onIncorrectAnswer}
                question={currentQuestion}
              />
            )}
            {currentQuestion.type === FILL_IN_THE_BLANK_MULTIPLE && (
              <MultipleBlanks
                question={currentQuestion}
                onIncorrectAnswer={onIncorrectAnswer}
                onCorrectAnswer={OnCorrectAnswer}
              />
            )}
          </>
        )}
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
