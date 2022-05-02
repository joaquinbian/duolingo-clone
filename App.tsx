import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Alert, Text, View } from "react-native";
import { styles } from "./App.styles";
import OptionButton from "./src/components/OptionButton";
import questions from "./assets/data/imageMulatipleChoiceQuestions";
import { useEffect, useRef, useState } from "react";
import CustomButton from "./src/components/Button";

export default function App() {
  const [isChecking, setIsChecking] = useState<boolean | undefined>(undefined);
  const [selected, setSelected] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[currentIndex]
  );

  const selectOption = (id: string): void => setSelected(id);

  useEffect(() => {
    if (currentIndex === questions.length) {
      Alert.alert("congratulations", "you won");
    } else {
      setCurrentQuestion(questions[currentIndex]);
      setSelected(null);
    }
  }, [currentIndex]);

  const checkAnswer = () => {
    const isAnswerCorrect = currentQuestion.options?.find(
      (option) => option.id === selected
    )?.correct;

    if (isAnswerCorrect && currentIndex === questions.length) {
      return Alert.alert("congratulations!", "you won the game!");
    } else {
      if (isAnswerCorrect) {
        Alert.alert("correct", "", [
          {
            text: "next",
            onPress: () => setCurrentIndex((index) => index + 1),
          },
        ]);
      } else {
        Alert.alert("incorrect");
      }
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{currentQuestion.question}</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion.options?.map((option) => (
            <OptionButton
              key={option.id}
              title={option.text}
              imgUrl={option.image}
              onPress={() => selectOption(option.id)}
              isSelected={selected === option.id}
            />
          ))}
        </View>

        <CustomButton
          onPress={checkAnswer}
          isLoading={isChecking}
          isDisabled={!selected}
        >
          check 2
        </CustomButton>
        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
