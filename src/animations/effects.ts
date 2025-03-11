import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

export const useSpellEffect = (isActive: boolean) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start({ opacity: 1, scale: 1.2 });
      setTimeout(() => {
        controls.start({ opacity: 0, scale: 1 });
      }, 1000);
    }
  }, [isActive, controls]);

  return controls;
};

export const useDamageEffect = (isHit: boolean) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isHit) {
      controls.start({ scale: 1.1 });
      setTimeout(() => {
        controls.start({ scale: 1 });
      }, 300);
    }
  }, [isHit, controls]);

  return controls;
};

export const useEnvironmentalEffect = (effectType: string) => {
  const controls = useAnimation();

  useEffect(() => {
    if (effectType) {
      controls.start({ opacity: 1 });
      setTimeout(() => {
        controls.start({ opacity: 0 });
      }, 1500);
    }
  }, [effectType, controls]);

  return controls;
};