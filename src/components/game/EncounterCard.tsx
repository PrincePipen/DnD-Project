import React from 'react';
import { useGameStore } from '../../store/game-store';
import { cn } from '../../lib/utils';

const EncounterCard = () => {
  const { currentScene, character } = useGameStore();

  return (
    <div className={cn("bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 transition-transform transform hover:scale-105", "duration-300")}>
      <h2 className="text-2xl font-bold mb-4">Current Encounter</h2>
      <p className="text-gray-300">{currentScene || "Prepare for your next challenge!"}</p>
      {character && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Character: {character.name}</h3>
          <p className="text-gray-400">Class: {character.class} | Level: {character.level}</p>
        </div>
      )}
      <button className="mt-4 btn-primary w-full" onClick={() => alert('Engaging in encounter!')}>
        Engage
      </button>
    </div>
  );
};

export default EncounterCard;