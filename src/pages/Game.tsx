import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/game-store';
import { motion } from 'framer-motion';
import { Card } from '../components/shared/Card';
import { AnimatedButton } from '../components/shared/AnimatedButton';
import DiceRoll from '../components/animations/DiceRoll';
import { useAudio } from '../context/AudioContext';
import { generateStoryProgress } from '../services/aiService';
import Toast from '../components/ui/Toast';

const Game = () => {
  const { character, currentScene, gameLog, updateScene, addToLog, questProgress, setQuestProgress } = useGameStore();
  const navigate = useNavigate();
  const { playEffect, playAmbient } = useAudio();
  
  // Game state
  const [showDice, setShowDice] = useState(false);
  const [] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [] = useState('');
  
  // Flag to track whether initial scene has been set
  const initialSceneSet = useRef(false);

  // Base story beats
  const storyBeats = [
    `The sun rises over the mountains as you, ${character?.name || 'adventurer'}, a ${character?.race || 'mysterious'} ${character?.class || 'wanderer'}, set out on your journey.`,
    "A worn path stretches before you, winding through the dense forest ahead.",
    "In the distance, you spot smoke rising from what appears to be a small village.",
    "As you approach, you hear calls for help - it seems your adventure begins with a choice..."
  ];

  // Redirect if no character and set initial scene
  useEffect(() => {
    if (!character) {
      navigate('/character');
      return;
    }

    // We only want to set this once
    if (!initialSceneSet.current && currentScene === '') {
      updateScene(storyBeats[0]);
      addToLog(storyBeats[0]);
      initialSceneSet.current = true; // Mark that we've set the initial scene
      playAmbient('forest'); // Start forest ambience
    }
  }, [character, navigate, currentScene, updateScene, addToLog, playAmbient]);

  // Progress the story based on user choices

  // Helper function to determine current location
  const determineLocation = (progress: number): string => {
    if (progress < 3) return 'village';
    if (progress < 6) return 'forest';
    return 'dungeon';
  };


  const handleRollDice = () => {
    setShowDice(true);
    playEffect('dice');
  };

  const handleRollComplete = (result: number) => {
    const rollMessage = `You rolled a ${result}!`;
    addToLog(rollMessage);
    setToastMessage(rollMessage);
    setShowToast(true);
    setShowDice(false);
  };


  const progressStory = async () => {
    setIsLoading(true);
    
    try {
      const newScene = await generateStoryProgress({
        character: character || undefined,
        currentScene,
        recentEvents: gameLog.slice(-3),
        questProgress,
        location: determineLocation(questProgress),
        action: 'continue',
        diceResult: undefined,
        prompt: ''
      });

      // Update the scene and log
      updateScene(newScene);
      addToLog(newScene);
      
      // Increment quest progress
      setQuestProgress(questProgress + 1);
      
      // Change ambient sound based on location
      handleLocationChange(questProgress + 1);
      
    } catch (error) {
      console.error('Story progression failed:', error);
      setToastMessage('The story hesitates for a moment...');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = (progress: number) => {
    const location = determineLocation(progress);
    
    switch (location) {
      case 'village':
        playAmbient('village');
        break;
      case 'forest':
        playAmbient('forest');
        break;
      case 'dungeon':
        playAmbient('dungeon');
        break;
      default:
        playAmbient('ambient');
    }
  };

  const handlePlayerChoice = async (choice: string) => {
    setIsLoading(true);
    
    try {
      const result = await generateStoryProgress({
        character: character ?? undefined,
        currentScene,
        recentEvents: gameLog.slice(-3),
        questProgress,
        location: determineLocation(questProgress),
        action: choice,
        diceResult: undefined,
        prompt: ''
      });
      
      updateScene(result);
      addToLog(result);
      playEffect('ambient');
      
    } catch (error) {
      console.error('Choice processing failed:', error);
      setToastMessage('Your choice leads to an uncertain outcome...');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
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
            <div className="flex justify-center py-8">
              <motion.div 
                className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <p className="text-xl">{currentScene || "Your adventure is about to begin..."}</p>
          )}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4 justify-end">
          <AnimatedButton onClick={handleRollDice} className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
            Roll Dice
          </AnimatedButton>
          
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent" />
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <AnimatedButton onClick={() => handlePlayerChoice('explore')} className="bg-green-600 hover:bg-green-700">
                Explore
              </AnimatedButton>
              <AnimatedButton onClick={progressStory} className="bg-purple-600 hover:bg-purple-700">
                Continue Journey
              </AnimatedButton>
            </>
          )}
        </div>
      </motion.div>

      {showDice && (
        <Card className="p-6">
          <DiceRoll onRollComplete={handleRollComplete} />
        </Card>
      )}

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
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              {entry}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default Game;

