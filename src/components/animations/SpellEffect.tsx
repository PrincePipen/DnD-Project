import React from 'react';
import Lottie from 'lottie-react';
import spellAnimation from '../../assets/lottie/spells.json';

interface SpellEffectProps {
  isActive: boolean;
  onComplete: () => void;
}

const SpellEffect: React.FC<SpellEffectProps> = ({ isActive, onComplete }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${isActive ? 'block' : 'hidden'}`}>
      <Lottie
        animationData={spellAnimation}
        loop={false}
        onComplete={onComplete}
        className="w-64 h-64"
      />
    </div>
  );
};

export default SpellEffect;