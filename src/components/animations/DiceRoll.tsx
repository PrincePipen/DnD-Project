import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DiceRollProps {
  sides?: number;
  onRollComplete: (result: number) => void;
}

const DiceRoll: React.FC<DiceRollProps> = ({ sides = 20, onRollComplete }) => {
  const [rolling, setRolling] = useState(true);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (rolling) {
      // Rapidly change numbers while rolling
      intervalId = setInterval(() => {
        setCurrentNumber(Math.floor(Math.random() * sides) + 1);
      }, 50);
      
      // Stop rolling after a random time between 1-2 seconds
      const timeout = setTimeout(() => {
        setRolling(false);
        const finalResult = Math.floor(Math.random() * sides) + 1;
        setResult(finalResult);
        setCurrentNumber(finalResult);
        
        // Give a slight delay before calling the completion handler
        setTimeout(() => {
          onRollComplete(finalResult);
        }, 1000);
      }, 1000 + Math.random() * 1000);
      
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeout);
      };
    }
    
    return () => clearInterval(intervalId);
  }, [rolling, sides, onRollComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-center">
        <motion.div
          className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold shadow-lg"
          animate={rolling ? {
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
            y: [0, -20, 0]
          } : {
            scale: [1.2, 1],
            y: [0, 0]
          }}
          transition={{
            duration: rolling ? 0.5 : 0.3,
            repeat: rolling ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {currentNumber}
          
          {/* Sparkle effects when result is shown */}
          {result && (
            <>
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full"
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 1, repeat: 2 }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full"
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 1, delay: 0.3, repeat: 2 }}
              />
            </>
          )}
        </motion.div>
        
        <motion.p 
          className="mt-4 text-xl font-bold text-purple-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: result ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {result ? `You rolled a ${result}!` : ''}
        </motion.p>
      </div>
    </div>
  );
};

export default DiceRoll;