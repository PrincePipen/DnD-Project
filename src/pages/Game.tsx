import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Scroll, Sparkles } from 'lucide-react';
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
  } = useGameStore();
  const [selectedChoice, setSelectedChoice] = useState<string>('');

  React.useEffect(() => {
    if (!activeCharacter) {
      navigate('/character');
      return;
    }

    if (!currentScene) {
      handleInitialScene();
    }
  }, [activeCharacter, currentScene]);

  const handleInitialScene = async () => {
    setLoading(true);
    try {
      const initialScene = await generateStoryProgress(
        activeCharacter,
        '',
        'start adventure'
      );
      updateScene(initialScene);
      addToLog('Adventure begins...');
      // Extract choices from the scene text (assuming they're at the end)
      const choicesList = initialScene
        .split('\n')
        .slice(-3)
        .filter((line) => line.trim());
      setChoices(choicesList);
    } catch (error) {
      console.error('Failed to generate initial scene:', error);
      updateScene('An error occurred while starting your adventure. Please try again.');
      setChoices(['Restart Adventure']);
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = async (choice: string) => {
    setLoading(true);
    setSelectedChoice(choice);
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
      setChoices(choicesList);
    } catch (error) {
      console.error('Failed to progress story:', error);
      updateScene('An error occurred while progressing the story. Please try again.');
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
        <h1 className="text-4xl font-medieval font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          {activeCharacter?.name}'s Adventure
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
          >
            <div className="prose prose-invert max-w-none">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-6 h-6 text-purple-500 animate-spin" />
                  <span>Generating story...</span>
                </div>
              ) : (
                <p className="text-xl leading-relaxed">{currentScene}</p>
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
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  disabled={isLoading}
                  className={`p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-700 transition-all duration-200 ${
                    selectedChoice === choice
                      ? 'border-purple-500 bg-gray-700'
                      : ''
                  }`}
                >
                  {choice}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
          >
            <h2 className="text-2xl font-medieval font-bold mb-4">Character</h2>
            <div className="space-y-2">
              <p>
                <span className="text-gray-400">Class:</span>{' '}
                {activeCharacter?.class}
              </p>
              <p>
                <span className="text-gray-400">Race:</span>{' '}
                {activeCharacter?.race}
              </p>
              <p>
                <span className="text-gray-400">Level:</span>{' '}
                {activeCharacter?.level}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
          >
            <h2 className="text-2xl font-medieval font-bold mb-4">
              Adventure Log
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {gameLog.map((entry, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-300"
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
