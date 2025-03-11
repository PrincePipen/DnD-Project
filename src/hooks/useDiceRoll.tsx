import { useState } from 'react';
import { useGameStore } from '../store/game-store';

const useDiceRoll = () => {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const addToLog = useGameStore((state) => state.addToLog);

  const rollDice = (sides: number) => {
    setRolling(true);
    setTimeout(() => {
      const rollResult = Math.floor(Math.random() * sides) + 1;
      setResult(rollResult);
      addToLog(`Rolled a ${rollResult} on a ${sides}-sided die.`);
      setRolling(false);
    }, 1000); // Simulate a rolling delay
  };

  return { rolling, result, rollDice };
};

export default useDiceRoll;