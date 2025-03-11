import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/game-store';
import { motion, AnimatePresence } from 'framer-motion';
import DiceRoll from '../components/animations/DiceRoll';
import SpellEffect from '../components/animations/SpellEffect';
import { cn } from '../lib/utils';
import { fetchAIResponse } from '../services/aiService';

const DungeonExplorer = () => {
  const { character, currentScene, gameLog, updateScene, addToLog } = useGameStore();
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [showSpellEffect, setShowSpellEffect] = useState(false);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [actionResult, setActionResult] = useState<string | null>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  // Sample dungeon descriptions - will be enhanced by AI
  const dungeonScenes = [
    "The dungeon corridor stretches before you, torches flickering on the damp stone walls.",
    "You enter a large chamber with a high ceiling. Broken columns line the sides.",
    "A narrow bridge spans a dark chasm. The sound of water echoes from far below.",
    "This room contains several ornate chests. Could there be treasure—or traps?"
  ];

  // Initialize the dungeon scene
  useEffect(() => {
    if (!currentScene.includes("dungeon")) {
      const initialScene = `You've entered the dungeon. ${dungeonScenes[0]}`;
      updateScene(initialScene);
      addToLog(initialScene);
      
      // Get AI enhancement for initial dungeon scene
      enhanceSceneWithAI(initialScene);
    }
  }, []);

  const enhanceSceneWithAI = async (baseScene: string) => {
    setIsGeneratingResponse(true);
    try {
      const context = {
        character: character || undefined,
        currentScene: baseScene,
        previousScenes: gameLog.slice(-2)
      };
      
      const enhancedScene = await fetchAIResponse(context);
      if (enhancedScene && enhancedScene !== baseScene) {
        updateScene(enhancedScene);
        addToLog(enhancedScene);
      }
    } catch (error) {
      console.error("Failed to get AI scene enhancement:", error);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleAction = (action: string) => {
    if (isGeneratingResponse) return; // Prevent multiple actions while AI is thinking
    
    setCurrentAction(action);
    
    // Different handling based on action type
    if (action === 'attack') {
      setShowDiceRoll(true);
    } else if (action === 'cast_spell') {
      setShowSpellEffect(true);
      setTimeout(() => {
        processActionResult(action);
      }, 2000);
    } else {
      processActionResult(action);
    }
  };

  const processActionResult = async (action: string) => {
    setIsGeneratingResponse(true);
    
    // Get AI to describe action outcome
    try {
      const context = {
        character: character || undefined,
        action,
        currentScene,
        previousScenes: gameLog.slice(-2)
      };
      
      const actionDescription = await fetchAIResponse(context);
      setActionResult(actionDescription);
      updateScene(`${currentScene} ${actionDescription}`);
      addToLog(actionDescription);
    } catch (error) {
      // Fallback to basic descriptions if AI fails
      let result = '';
      switch (action) {
        case 'attack':
          result = "You swing your weapon at the enemy, landing a solid hit!";
          break;
        case 'defend':
          result = "You raise your guard, preparing for incoming attacks.";
          break;
        case 'use_item':
          result = "You search your pack for a useful item.";
          break;
        case 'cast_spell':
          result = `You cast a spell, magical energy flows through the air!`;
          break;
      }
      
      setActionResult(result);
      updateScene(`${currentScene} ${result}`);
      addToLog(result);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleRollComplete = async (rollResult: number) => {
    setShowDiceRoll(false);
    
    setIsGeneratingResponse(true);
    try {
      const context = {
        character: character || undefined,
        diceResult: rollResult,
        action: 'attack',
        currentScene
      };
      
      const attackResult = await fetchAIResponse(context);
      setActionResult(attackResult);
      addToLog(attackResult);
    } catch (error) {
      // Fallback calculation
      const damage = rollResult + (character?.stats.strength || 0) / 2;
      const result = `You rolled ${rollResult}. You deal ${Math.floor(damage)} damage!`;
      setActionResult(result);
      addToLog(result);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleSpellComplete = () => {
    setShowSpellEffect(false);
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Dungeon Explorer
      </h1>

      {/* Dungeon visualization */}
      <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          {isGeneratingResponse ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white">The DM is thinking...</p>
            </div>
          ) : (
            <p className="text-xl text-center text-white p-6">{currentScene}</p>
          )}
          
          <AnimatePresence>
            {showSpellEffect && (
              <SpellEffect isActive={true} onComplete={handleSpellComplete} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-around bg-gray-800 p-4 rounded-lg shadow-lg">
        {["attack", "defend", "use_item", "cast_spell"].map((action) => (
          <motion.button
            key={action}
            className={cn(
              'px-4 py-2 m-2 rounded-md transition-colors duration-200',
              'bg-gray-700 text-gray-300 hover:bg-purple-500',
              isGeneratingResponse && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => handleAction(action)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isGeneratingResponse}
          >
            {action.replace('_', ' ').charAt(0).toUpperCase() + action.replace('_', ' ').slice(1)}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showDiceRoll && (
          <motion.div
            className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <DiceRoll onRollComplete={handleRollComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results display */}
      <AnimatePresence>
        {actionResult && (
          <motion.div
            className="bg-gray-800 rounded-lg p-4 shadow-lg border border-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg">{actionResult}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Adventure log */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Adventure Log</h2>
        <div className="max-h-60 overflow-y-auto">
          {gameLog.length === 0 ? (
            <p className="text-gray-400">No actions yet...</p>
          ) : (
            <div className="space-y-2">
              {gameLog.slice().reverse().map((entry, index) => (
                <motion.p 
                  key={index} 
                  className={cn("text-gray-300 p-2 rounded-md", index % 2 === 0 ? "bg-gray-700" : "bg-gray-600")}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * Math.min(index, 5) }}
                >
                  {entry}
                </motion.p>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DungeonExplorer;