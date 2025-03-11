import { useEffect, useState } from 'react';
import { useGameStore } from '../store/game-store';
import { Character } from '../types/character';

const useCharacterStats = () => {
  const { character, setCharacter } = useGameStore();
  const [stats, setStats] = useState<Character | null>(character);

  useEffect(() => {
    setStats(character);
  }, [character]);

  const updateStat = (stat: keyof Character['stats'], value: number) => {
    if (stats) {
      const updatedStats = {
        ...stats,
        stats: {
          ...stats.stats,
          [stat]: value,
        },
      };
      setCharacter(updatedStats);
      setStats(updatedStats);
    }
  };

  return {
    stats,
    updateStat,
  };
};

export default useCharacterStats;