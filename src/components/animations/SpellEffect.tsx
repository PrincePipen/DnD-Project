import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import spellAnimation from '../../assets/lottie/spells.json';

interface SpellEffectProps {
  isActive: boolean;
  onComplete: () => void;
  type?: 'fire' | 'ice' | 'lightning' | 'arcane';
}

const SpellEffect: React.FC<SpellEffectProps> = ({ isActive, onComplete, type = 'arcane' }) => {
  const { playEffect } = useAudio();
  
  // Set up colors based on spell type
  const colors = {
    fire: ['#ff4d4d', '#ff9933', '#ffcc00'],
    ice: ['#66ccff', '#99e6ff', '#cceeff'],
    lightning: ['#ffff66', '#99ccff', '#cc99ff'],
    arcane: ['#cc33ff', '#9933ff', '#6600cc']
  };
  
  const selectedColors = colors[type];
  
  useEffect(() => {
    if (isActive) {
      playEffect('spell');
      
      // Trigger the completion callback after the animation duration
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, playEffect]);
  
  if (!isActive) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Central spell orb */}
      <motion.div
        className="w-32 h-32 rounded-full bg-opacity-80 z-10"
        style={{ backgroundColor: selectedColors[0] }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.5, 1] 
        }}
      />
      
      {/* Particles bursting outward */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-4 h-4 rounded-full"
          style={{ 
            backgroundColor: selectedColors[i % 3],
            boxShadow: `0 0 10px 2px ${selectedColors[i % 3]}`
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 0.7, 0]
          }}
          transition={{ 
            duration: 1 + Math.random(),
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Magical runes/symbols */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`rune-${i}`}
          className="absolute w-48 h-48 border-2 rounded-full"
          style={{ 
            borderColor: selectedColors[i % 3],
            transform: `rotate(${i * 45}deg)`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default SpellEffect;