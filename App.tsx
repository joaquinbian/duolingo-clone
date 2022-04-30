import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Text, View } from "react-native";
import { styles } from "./App.styles";
import OptionButton from "./src/components/OptionButton";
import question from "./assets/data/oneQuestionWithOption";
import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectOption = (id: string): void => setSelected(id);
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
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
