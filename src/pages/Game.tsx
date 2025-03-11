import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/game-store';
import { Card } from '../components/shared/Card';
import { AnimatedButton as SharedAnimatedButton } from '../components/shared/AnimatedButton';
import DiceRoll from '../components/animations/DiceRoll';
import { fetchAIResponse } from '../services/aiService';

const Game = () => {
  const { character, currentScene, gameLog, updateScene, addToLog } = useGameStore();
  const navigate = useNavigate();
  const [showDice, setShowDice] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const storyProgressRef = useRef(0);

  // Track story progress reference for AI callbacks
  useEffect(() => {
    storyProgressRef.current = storyProgress;
  }, [storyProgress]);

  // Base story beats - these will be enhanced by AI
  const storyBeats = [
    `The sun rises over the mountains as you, ${character?.name || 'adventurer'}, a ${character?.race || 'mysterious'} ${character?.class || 'wanderer'}, set out on your journey.`,
    "A worn path stretches before you, winding through the dense forest ahead.",
    "In the distance, you spot smoke rising from what appears to be a small village.",
    "As you approach, you hear calls for help - it seems your adventure begins with a choice..."
  ];

  // Redirect if no character
  useEffect(() => {
    if (!character) {
      navigate('/character');
    } else if (currentScene === '' && gameLog.length === 0) {
      // Only set initial scene if game is just starting
      const initialScene = storyBeats[0];
      updateScene(initialScene);
      addToLog(initialScene);
    }
  }, [character, navigate, currentScene, updateScene, addToLog, gameLog.length]);

  const getAIStoryEnhancement = async (sceneIndex: number) => {
    setIsLoading(true);
    try {
      const baseScene = storyBeats[sceneIndex];
      const context = {
        character: character || undefined,
        currentScene: baseScene,
        gameProgress: sceneIndex / storyBeats.length,
        previousScenes: gameLog.slice(-3) // Last 3 log entries for context
      };
      
      // Get enhanced story from AI
      const enhancedScene = await fetchAIResponse(context);
      setAiResponse(enhancedScene);
      return enhancedScene || baseScene;
    } catch (error) {
      console.error("Failed to get AI story enhancement:", error);
      return storyBeats[sceneIndex]; // Fallback to basic story
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    if (storyProgress < storyBeats.length - 1) {
      const nextProgress = storyProgress + 1;
      setStoryProgress(nextProgress);
      
      // Get AI-enhanced scene
      const enhancedScene = await getAIStoryEnhancement(nextProgress);
      
      updateScene(enhancedScene);
      addToLog(enhancedScene);
    } else {
      // At end of intro, proceed to dungeon
      navigate('/dungeon');
    }
  };

  const handleRollDice = () => {
    setShowDice(true);
  };

  const handleRollComplete = (result: any) => {
    addToLog(`You rolled a ${result}!`);
    setShowDice(false);
    
    // Add AI response to dice roll
    setTimeout(async () => {
      const diceContext = {
        character: character || undefined,
        diceResult: result,
        currentScene,
        gameProgress: storyProgressRef.current / storyBeats.length
      };
      
      try {
        const aiReaction = await fetchAIResponse(diceContext);
        if (aiReaction) {
          addToLog(aiReaction);
          updateScene(`${currentScene} ${aiReaction}`);
        }
      } catch (error) {
        console.error("Failed to get AI dice reaction:", error);
      }
    }, 500);
  };

  if (!character) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.h1 
        className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {character?.name}'s Adventure
      </motion.h1>
      
      <motion.div 
        className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <div className="prose prose-invert max-w-none">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-lg">The story unfolds...</span>
            </div>
          ) : (
            <p className="text-xl">{currentScene || "Your adventure is about to begin..."}</p>
          )}
        </div>
        
        <div className="mt-6 flex space-x-4 justify-end">
          <SharedAnimatedButton onClick={handleRollDice} className="bg-indigo-600 hover:bg-indigo-700">
            Roll Dice
          </SharedAnimatedButton>
          <SharedAnimatedButton onClick={handleContinue} disabled={isLoading}>
            {storyProgress < storyBeats.length - 1 ? 'Continue Journey' : 'Enter Dungeon'}
          </SharedAnimatedButton>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <DiceRoll onRollComplete={handleRollComplete} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-4">Adventure Log</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {gameLog.map((entry, index) => (
            <motion.p 
              key={index} 
              className="text-gray-300 p-2 bg-gray-700 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {entry}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Game;

export type AnimatedButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const AnimatedButton = ({ children, onClick, className = '', disabled = false }: AnimatedButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded ${className}`}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
