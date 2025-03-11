import React from 'react';
import { useGameStore } from '../store/game-store';

const Game = () => {
  const { currentScene, gameLog } = useGameStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Your Adventure
      </h1>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="prose prose-invert max-w-none">
          <p className="text-xl">{currentScene || "Your adventure is about to begin..."}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Adventure Log</h2>
        <div className="space-y-2">
          {gameLog.map((entry, index) => (
            <p key={index} className="text-gray-300">{entry}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
