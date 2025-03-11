import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

export const combatAnimations = {
  attack: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
  },
  defend: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
  },
  criticalHit: {
    initial: { opacity: 0, scale: 1.5 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.5, transition: { duration: 0.5 } },
  },
};

export const useCombatAnimation = (action) => {
  const controls = useAnimation();

  useEffect(() => {
    if (action) {
      controls.start(combatAnimations[action].animate);
    }
  }, [action, controls]);

  return controls;
};