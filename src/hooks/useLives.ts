import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLives = (livesQuantity: number = 5) => {
  const [lives, setLives] = useState(livesQuantity);

  const decrementLives = () => {
    setLives((lives) => lives - 1);
  };

  //si no le mandamos nada, que le resetee la vida al valor por defecto
  const resetLives = (lives: number = livesQuantity) => {
    setLives(lives);
  };

  const getCurrentLives = async () => {
    try {
      const lives = await AsyncStorage.getItem("@lives");
      resetLives(Number(lives || livesQuantity));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getCurrentLives();
  }, []);
  return {
    lives,
    decrementLives,
    resetLives,
  };
};
