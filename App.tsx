import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Alert, Text, View } from "react-native";
import { styles } from "./App.styles";
import OptionButton from "./src/components/OptionButton";
import questions from "./assets/data/imageMulatipleChoiceQuestions";
import openEndedQuestions from "./assets/data/openEndedQuestions";
import { useEffect, useRef, useState } from "react";
import CustomButton from "./src/components/Button";
import Question from "./src/components/Question";
import OpenEndedQuestions from "./src/components/OpenEndedQuestions";

export default function App() {
  // const [isChecking, setIsChecking] = useState<boolean | undefined>(undefined);
  const [selected, setSelected] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    openEndedQuestions[currentIndex]
  );

  const selectOption = (id: string): void => setSelected(id);

  useEffect(() => {
    if (currentIndex === openEndedQuestions.length) {
      Alert.alert("congratulations", "you won");
    } else {
      setCurrentQuestion(openEndedQuestions[currentIndex]);
    }
    setSelected(null);
  }, [currentIndex]);

  // const isAnswerCorrect = currentQuestion.options?.find(
  //   (option) => option.id === selected
  // )?.correct;
  // const checkAnswer = () => {

  //     if (isAnswerCorrect) {
  //       Alert.alert("correct", "", [
  //         {
  //           text: "next",
  //           onPress: () => setCurrentIndex((index) => index + 1),
  //         },
  //       ]);
  //     } else {
  //       Alert.alert("incorrect");
  //   }
  // };

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
        {/* <Question
          question={currentQuestion}
          selected={selected}
          selectOption={selectOption}
        /> */}

        <OpenEndedQuestions
          onCorrectAnswer={OnCorrectAnswer}
          onIncorrectAnswer={onIncorrectAnswer}
          question={currentQuestion}
        />
        {/* <CustomButton onPress={checkAnswer}>check 2</CustomButton> */}
        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
