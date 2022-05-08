import { useState } from "react";

export const useLives = (livesQuantity: number = 5) => {
  const [lives, setLives] = useState(livesQuantity);

  const decrementLives = () => {
    setLives((lives) => lives - 1);
  };

  //si no le mandamos nada, que le resetee la vida al valor por defecto
  const resetLives = (lives: number = livesQuantity) => {
    setLives(lives);
  };

  return {
    lives,
    decrementLives,
    resetLives,
  };
};
