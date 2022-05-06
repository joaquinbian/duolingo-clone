import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Progress } from "native-base";
import { Alert, Text } from "react-native";
import { styles } from "./App.styles";
import questions from "./assets/data/allQuestions";
import Question from "./src/components/Question";
import { Question as QuestionInterface } from "./src/interfaces/question";
import OpenEndedQuestions from "./src/components/OpenEndedQuestions";
import { QuestionType } from "./src/interfaces/question";
import Header from "./src/components/Header";

const TYPE_QUESTION: QuestionType = "IMAGE_MULTIPLE_CHOICE";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionInterface>(
    questions[currentIndex]
  );
  const [lives, setLives] = useState(5);

  useEffect(() => {
    if (currentIndex === questions.length) {
      Alert.alert("congratulations", "you won");
    } else {
      setCurrentQuestion(questions[currentIndex]);
    }
  }, [currentIndex]);

  const OnCorrectAnswer = () => {
    Alert.alert("correct", "", [
      {
        text: "next",
        onPress: () => setCurrentIndex((index) => index + 1),
      },
    ]);
  };

  const restartGame = () => {
    setLives(5);
    setCurrentIndex(0);
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
      setLives((lives) => lives - 1);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Header
          currentIndex={currentIndex}
          maxValue={questions.length}
          lives={lives}
        />
        {currentQuestion.type === TYPE_QUESTION ? (
          <Question
            question={currentQuestion}
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
