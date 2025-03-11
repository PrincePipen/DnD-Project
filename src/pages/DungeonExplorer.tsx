import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/game-store';
import DungeonMap from '../components/game/DungeonMap';
import ActionBar from '../components/game/ActionBar';
import CombatLog from '../components/game/CombatLog';
import { useAudio } from '../context/AudioContext';
import { cn } from '../lib/utils';
import Toast from '../components/ui/Toast';

const DungeonExplorer = () => {
  const { currentScene, gameLog, updateScene, addToLog } = useGameStore();
  const { playEffect } = useAudio();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Simulate ambient sound loading
    // playAmbientSound('ambient/dungeon.mp3');
    return () => {
      // cleanup
    };
  }, []);

  const handleAction = (action: string) => {
    // Logic for handling player actions
    const newScene = `You chose to ${action}.`;
    updateScene(newScene);
    addToLog(newScene);
    setShowToast(true);
    playEffect('roll');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Dungeon Explorer
      </h1>

      <DungeonMap />

      <div className="flex justify-around bg-gray-800 p-4 rounded-lg shadow-lg">
        {["attack", "defend", "use_item", "cast_spell"].map((action) => (
          <button
            key={action}
            className="px-4 py-2 rounded-md transition-colors duration-200 bg-gray-700 text-gray-300 hover:bg-purple-500"
            onClick={() => handleAction(action)}
          >
            {action.replace('_', ' ').charAt(0).toUpperCase() + action.replace('_', ' ').slice(1)}
          </button>
        ))}
      </div>

      <div className={cn("bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700", { 'animate-pulse': showToast })}>
        <h2 className="text-2xl font-bold mb-4">Adventure Log</h2>
        <div className="max-h-60 overflow-y-auto">
          {gameLog.length === 0 ? (
            <p className="text-gray-400">No actions yet...</p>
          ) : (
            gameLog.map((entry, index) => (
              <p key={index} className={cn("text-gray-300", index % 2 === 0 ? "bg-gray-700" : "bg-gray-600", "p-2 rounded-md")}>
                {entry}
              </p>
            ))
          )}
        </div>
      </div>

      {showToast && (
        <Toast message="Action performed!" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default DungeonExplorer;