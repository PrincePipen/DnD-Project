import { useState, useEffect } from 'react';
import { useGameStore } from '../store/game-store';
import { Character } from '../types/character';

export const useCharacterStats = () => {
  const { character, setCharacter } = useGameStore();
  const [stats, setStats] = useState<Character['stats'] | null>(character?.stats || null);

  useEffect(() => {
    if (character?.stats) {
      setStats(character.stats);
    }
  }, [character]);

  const getCharacterStats = () => {
    return stats;
  };

  const updateStat = (stat: keyof Character['stats'], value: number) => {
    if (!character) return;
    
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        [stat]: value,
      }
    };
    
    setCharacter(updatedCharacter);
  };

  return { stats, updateStat, getCharacterStats };
};

export default useCharacterStats;