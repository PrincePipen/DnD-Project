import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import diceAnimation from '../../assets/lottie/dice.json';

const DiceRoll = ({ onRollComplete }) => {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);

  const rollDice = () => {
    setRolling(true);
    const rollResult = Math.floor(Math.random() * 6) + 1; // Simulating a 6-sided dice roll
    setResult(rollResult);
    setTimeout(() => {
      setRolling(false);
      if (onRollComplete) {
        onRollComplete(rollResult);
      }
    }, 2000); // Duration of the animation
  };

  useEffect(() => {
    if (result !== null) {
      // You can add any additional logic here after the roll is complete
    }
  }, [result]);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={rollDice}
        className="btn-primary mb-4"
        disabled={rolling}
      >
        Roll Dice
      </button>
      {rolling && <Lottie animationData={diceAnimation} loop />}
      {result !== null && !rolling && (
        <div className="text-2xl font-bold mt-4">
          You rolled a {result}!
        </div>
      )}
    </div>
  );
};

export default DiceRoll;