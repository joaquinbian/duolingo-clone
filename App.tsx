import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Button, NativeBaseProvider } from "native-base";
import { Text, View } from "react-native";
import { styles } from "./App.styles";
import OptionButton from "./src/components/OptionButton";
import question from "./assets/data/oneQuestionWithOption";
import { useRef, useState } from "react";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import CustomButton from "./src/components/Button";

export default function App() {
  const [isChecking, setIsChecking] = useState<boolean | undefined>(undefined);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const firstRender = useRef(true);

  const selectOption = (id: string): void => setSelected(id);

  const checkAnswer = () => {
    setIsChecking((prev) => !prev);
    setTimeout(() => {
      const answerIsCorrect = !!question.options.find(
        (option) => option.id === selected
      )?.correct;
      setIsCorrect(answerIsCorrect);
      setIsChecking((prev) => !prev);
    }, 1500);
  };

  console.log({ isCorrect });

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{question.question}</Text>
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
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
          title="check"
          style={{ backgroundColor: "red" }}
          onPress={checkAnswer}
          isLoading={isChecking}
          isDisabled={!selected}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
