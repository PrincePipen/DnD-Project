import React from 'react';
import { useGameStore } from '../store/game-store';
import { Card } from '../components/shared/Card';

const StoryJournal = () => {
  const { gameLog } = useGameStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
        Story Journal
      </h1>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Your Adventures</h2>
        <div className="space-y-4">
          {gameLog.length > 0 ? (
            gameLog.map((entry, index) => (
              <Card key={index} className="p-4">
                <p className="text-gray-300">{entry}</p>
              </Card>
            ))
          ) : (
            <p className="text-gray-400">No entries yet. Start your adventure!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryJournal;