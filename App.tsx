import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Progress } from "native-base";
import { ActivityIndicator, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./App.styles";
import questions from "./assets/data/allQuestions";
import Question from "./src/components/Question";
import { Question as QuestionInterface } from "./src/interfaces/question";
import OpenEndedQuestions from "./src/components/OpenEndedQuestions";
import { QuestionType } from "./src/interfaces/question";
import Header from "./src/components/Header";

const TYPE_QUESTION: QuestionType = "IMAGE_MULTIPLE_CHOICE";

interface saveDataProps {
  key: string;
  value: string;
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionInterface>(
    questions[currentIndex]
  );
  const [lives, setLives] = useState<number | null>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    getGameDataFromStorage();
  }, []);
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
      setLives((lives) => lives! - 1);
    }
  };

  useEffect(() => {
    if (!firstRender.current) {
      saveData({ key: "@questionIndex", value: currentIndex.toString() });
      saveData({ key: "@lives", value: lives!.toString() });
    }
    firstRender.current = false;
  }, [currentIndex, lives]);

  const saveData = async ({ key, value }: saveDataProps) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log({ error });
    }
  };

  const getGameDataFromStorage = async () => {
    try {
      const lives = await AsyncStorage.getItem("@lives");
      const currentIndex = await AsyncStorage.getItem("@questionIndex");

      setLives(Number(lives) || 5);
      setCurrentIndex(Number(currentIndex) || 0);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading((val) => !val);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        {/* {isLoading ? (
          <ActivityIndicator color="green" />
        ) : ( */}
        <>
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
        </>
        {/* )} */}

        <StatusBar style="auto" />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
