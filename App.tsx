import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Text, View } from "react-native";
import { styles } from "./App.styles";
import OptionButton from "./src/components/OptionButton";

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Wich of this is Glass?</Text>
        <View style={styles.optionsContainer}>
          <OptionButton
            title="copa"
            imgUrl="https://fsmd-assets.s3.eu-west-1.amazonaws.com/duolingo/images/cup.png"
            onPress={() => console.log("copa")}
          />
          <OptionButton
            title="copa"
            imgUrl="https://fsmd-assets.s3.eu-west-1.amazonaws.com/duolingo/images/cup.png"
            onPress={() => console.log("copa")}
          />
          <OptionButton
            title="copa"
            imgUrl="https://fsmd-assets.s3.eu-west-1.amazonaws.com/duolingo/images/cup.png"
            onPress={() => console.log("copa")}
          />
          <OptionButton
            title="copa"
            imgUrl="https://fsmd-assets.s3.eu-west-1.amazonaws.com/duolingo/images/cup.png"
            onPress={() => console.log("copa")}
          />
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
