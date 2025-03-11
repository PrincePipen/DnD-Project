import React, { useState } from 'react';
import Lottie from 'lottie-react';
import diceAnimation from '../../assets/lottie/dice.json';
import { useDiceRoll } from '../../hooks/useDiceRoll';

const Dice = () => {
  const [rollResult, setRollResult] = useState(null);
  const { rollDice } = useDiceRoll();

  const handleRoll = () => {
    const result = rollDice();
    setRollResult(result);
  };

  return (
    <div className="flex flex-col items-center">
      <Lottie
        animationData={diceAnimation}
        loop={false}
        className="w-48 h-48 mb-4"
        onClick={handleRoll}
      />
      <button
        onClick={handleRoll}
        className="btn-primary mt-4"
      >
        Roll Dice
      </button>
      {rollResult !== null && (
        <div className="mt-4 text-2xl font-bold text-gray-300">
          You rolled: {rollResult}
        </div>
      )}
    </div>
  );
};

export default Dice;