import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Scroll, Sparkles, Save } from 'lucide-react';
import { useGameStore } from '../store/game-store';
import { generateStoryProgress } from '../lib/ai';

const Game = () => {
  const navigate = useNavigate();
  const {
    activeCharacter,
    currentScene,
    gameLog,
    choices,
    isLoading,
    updateScene,
    addToLog,
    setChoices,
    setLoading,
    saveCharacterProgress,
  } = useGameStore();
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeCharacter) {
      navigate('/character');
      return;
    }

    if (!currentScene) {
      handleInitialScene();
    }
  }, [activeCharacter]);

  useEffect(() => {
    if (activeCharacter?.id && currentScene) {
      saveCharacterProgress(activeCharacter.id, currentScene, choices, gameLog);
    }
  }, [currentScene, choices, gameLog]);

  const handleInitialScene = async () => {
    setLoading(true);
    setError(null);
    try {
      const initialScene = await generateStoryProgress(
        activeCharacter,
        '',
        'start adventure'
      );
      updateScene(initialScene);
      addToLog('Adventure begins...');
      const choicesList = initialScene
        .split('\n')
        .slice(-3)
        .filter((line) => line.trim());
      setChoices(choicesList.length > 0 ? choicesList : ['Continue the adventure']);
    } catch (error: any) {
      console.error('Failed to generate initial scene:', error);
      const errorMessage = error.message || 'An error occurred while starting your adventure.';
      setError(errorMessage);
      updateScene('The ancient scrolls are momentarily unclear. Perhaps we should try again?');
      setChoices(['Restart Adventure']);
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = async (choice: string) => {
    setLoading(true);
    setSelectedChoice(choice);
    setError(null);
    try {
      const nextScene = await generateStoryProgress(
        activeCharacter,
        currentScene,
        choice
      );
      addToLog(`${activeCharacter.name} chose: ${choice}`);
      updateScene(nextScene);
      const choicesList = nextScene
        .split('\n')
        .slice(-3)
        .filter((line) => line.trim());
      setChoices(choicesList.length > 0 ? choicesList : ['Continue the adventure']);
    } catch (error: any) {
      console.error('Failed to progress story:', error);
      const errorMessage = error.message || 'An error occurred while progressing the story.';
      setError(errorMessage);
      updateScene('The story momentarily falters. Shall we continue from where we left off?');
      setChoices(['Continue from last point', 'Restart Adventure']);
    } finally {
      setLoading(false);
      setSelectedChoice('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-medieval font-bold bg-gradient-to-r from-amber-400 to-red-600 text-transparent bg-clip-text">
          {activeCharacter?.name}'s Adventure
        </h1>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 text-red-200"
        >
          <p>{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-amber-900/30"
          >
            <div className="prose prose-invert max-w-none">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-6 h-6 text-amber-500 animate-spin" />
                  <span className="text-amber-400">Weaving the tale...</span>
                </div>
              ) : (
                <p className="text-xl leading-relaxed text-amber-100">{currentScene}</p>
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 gap-4"
            >
              {choices.map((choice, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleChoice(choice)}
                  disabled={isLoading}
                  className={`p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-amber-900/30 hover:border-amber-500/50 hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-102 ${
                    selectedChoice === choice
                      ? 'border-amber-500 from-gray-700 to-gray-800'
                      : ''
                  }`}
                >
                  <span className="text-amber-400">{choice}</span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-amber-900/30"
          >
            <h2 className="text-2xl font-medieval font-bold mb-4 text-amber-400">Character</h2>
            <div className="space-y-2">
              <p>
                <span className="text-amber-400/70">Class:</span>{' '}
                <span className="text-amber-300">{activeCharacter?.class}</span>
              </p>
              <p>
                <span className="text-amber-400/70">Race:</span>{' '}
                <span className="text-amber-300">{activeCharacter?.race}</span>
              </p>
              <p>
                <span className="text-amber-400/70">Level:</span>{' '}
                <span className="text-amber-300">{activeCharacter?.level}</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-amber-900/30"
          >
            <h2 className="text-2xl font-medieval font-bold mb-4 text-amber-400">
              Adventure Log
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-gray-800">
              {gameLog.map((entry, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-amber-300/70"
                >
                  {entry}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Game;
