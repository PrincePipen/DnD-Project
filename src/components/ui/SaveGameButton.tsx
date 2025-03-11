import React, { useState } from 'react';
import { useGameStore } from '../../store/game-store';
import { saveGameState } from '../../services/storageService';
import { AnimatedButton } from '../shared/AnimatedButton';

const SaveGameButton = () => {
  const state = useGameStore();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    try {
      saveGameState({
        character: state.character,
        currentScene: state.currentScene,
        gameLog: state.gameLog,
        questProgress: state.questProgress
      });
      postMessage('Game saved successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Failed to save game:', error);
      postMessage('Failed to save game');
      setShowToast(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatedButton 
      onClick={handleSave}
      disabled={saving}
      className="bg-green-600 hover:bg-green-700"
    >
      {saving ? 'Saving...' : 'Save Game'}
    </AnimatedButton>
  );
};

export default SaveGameButton;


function setShowToast(_arg0: boolean) {
    throw new Error('Function not implemented.');
}