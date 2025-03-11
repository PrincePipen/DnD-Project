import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import diceAnimation from '../../assets/lottie/dice.json';
import { motion } from 'framer-motion';

interface DiceRollProps {
  onRollComplete: (result: number) => void;
}

const DiceRoll: React.FC<DiceRollProps> = ({ onRollComplete }) => {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  // Auto-roll when component mounts
  useEffect(() => {
    rollDice();
  }, []);

  const rollDice = () => {
    if (rolling) return; // Prevent multiple rolls
    
    setRolling(true);
    setResult(null);
    
    const rollResult = Math.floor(Math.random() * 20) + 1; // d20
    
    // Wait for animation before showing result
    setTimeout(() => {
      setResult(rollResult);
      setRolling(false);
      
      // Give time to see the result before calling the completion handler
      setTimeout(() => {
        if (onRollComplete) {
          onRollComplete(rollResult);
        }
      }, 1000);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: rolling ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
        className="w-48 h-48 flex items-center justify-center"
      >
        {rolling ? (
          <Lottie 
            animationData={diceAnimation} 
            loop={true} 
            className="w-full h-full"
          />
        ) : result !== null ? (
          <motion.div 
            className="flex items-center justify-center w-24 h-24 rounded-lg bg-purple-700 text-white text-4xl font-bold shadow-lg"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            {result}
          </motion.div>
        ) : null}
      </motion.div>
      
      {!rolling && result === null && (
        <p className="text-gray-300 mt-2">Rolling the dice...</p>
      )}
      
      {result !== null && !rolling && (
        <motion.div 
          className="text-2xl font-bold mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          You rolled a {result}!
        </motion.div>
      )}
    </div>
  );
};

export default DiceRoll;