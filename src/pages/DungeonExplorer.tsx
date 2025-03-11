import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/game-store';
import { DungeonMap } from '../components/game/DungeonMap';
import { ActionBar } from '../components/game/ActionBar';
import { CombatLog } from '../components/game/CombatLog';
import { useAudio } from '../hooks/useAudio';
import { cn } from '../lib/utils';
import { Toast } from '../components/ui/Toast';

const DungeonExplorer = () => {
  const { currentScene, gameLog, updateScene, addToLog } = useGameStore();
  const { playAmbientSound, stopAmbientSound } = useAudio();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    playAmbientSound('ambient/dungeon.mp3'); // Example sound file
    return () => stopAmbientSound();
  }, [playAmbientSound, stopAmbientSound]);

  const handleAction = (action) => {
    // Logic for handling player actions
    const newScene = `You chose to ${action}.`;
    updateScene(newScene);
    addToLog(newScene);
    setShowToast(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Dungeon Explorer
      </h1>

      <DungeonMap currentScene={currentScene} />

      <ActionBar onAction={handleAction} />

      <div className={cn("bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700", { 'animate-pulse': showToast })}>
        <h2 className="text-2xl font-bold mb-4">Adventure Log</h2>
        <CombatLog logEntries={gameLog} />
      </div>

      {showToast && (
        <Toast message="Action performed!" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default DungeonExplorer;