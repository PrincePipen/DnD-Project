import { useEffect, useState } from 'react';
import { useGameStore } from '../store/game-store';
import { useAudio } from './useAudio';
import { useCharacterStats } from './useCharacterStats';

const useGameState = () => {
  const { character, currentScene, gameLog, updateScene, addToLog } = useGameStore();
  const { playAmbientSound } = useAudio();
  const { getCharacterStats } = useCharacterStats();
  
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    if (character) {
      setIsGameActive(true);
      playAmbientSound();
      addToLog(`Welcome, ${character.name}! Your adventure begins...`);
    }
  }, [character, playAmbientSound, addToLog]);

  const startNewScene = (scene: string) => {
    updateScene(scene);
    addToLog(`You have entered: ${scene}`);
  };

  const getCurrentCharacterStats = () => {
    return getCharacterStats();
  };

  return {
    isGameActive,
    currentScene,
    startNewScene,
    getCurrentCharacterStats,
    gameLog,
  };
};

export default useGameState;