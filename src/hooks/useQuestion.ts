import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { Question } from "../interfaces/question";
import questions from "../../assets/data/allQuestions";
import { useLives } from "./useLives";
import { useAsyncStorage } from "./useAsyncStorage";
export const useQuestion = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[currentIndex]
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { lives, resetLives, decrementLives } = useLives(5);

  const { setValue, getDataFromStorage } = useAsyncStorage("@currentIndex");

  const firstRender = useRef<boolean>(true);

  const restartGame = () => {
    setCurrentIndex(0);
    resetLives();
  };

  const OnCorrectAnswer = () => {
    Alert.alert("correct", "", [
      {
        text: "next",
        onPress: () => setCurrentIndex((index) => index + 1),
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
    } else {
      setCurrentQuestion(questions[currentIndex]);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!firstRender.current) {
      setValue(currentIndex);
    }
    return () => {
      firstRender.current = false;
    };
  }, [currentIndex]);

  useEffect(() => {
    getQuestionIndexFromStorage();
  }, []);

  const getQuestionIndexFromStorage = async () => {
    try {
      const currentIndex = await getDataFromStorage();

      console.log({ lives, currentIndex }, "in get data game from storage");

      setCurrentIndex(Number(currentIndex) || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentQuestion,
    lives,
    OnCorrectAnswer,
    onIncorrectAnswer,
    currentIndex,
    isLoading,
  };
};
