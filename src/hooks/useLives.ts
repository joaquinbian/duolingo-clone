import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAsyncStorage } from "./useAsyncStorage";

export const useLives = (livesQuantity: number = 5) => {
  const [lives, setLives] = useState(livesQuantity);
  const { getDataFromStorage, setValue } = useAsyncStorage("@lives");
  const firstRender = useRef<boolean>(true);

  const decrementLives = () => {
    setLives((lives) => lives - 1);
  };

  //si no le mandamos nada, que le resetee la vida al valor por defecto
  const resetLives = (lives: number = livesQuantity) => {
    setLives(lives);
  };

  const getCurrentLives = async () => {
    try {
      const lives = await getDataFromStorage();
      resetLives(Number(lives || livesQuantity));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getCurrentLives();
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      setValue(lives);
    }
    return () => {
      firstRender.current = false;
    };
  }, [lives]);

  return {
    lives,
    decrementLives,
    resetLives,
  };
};
