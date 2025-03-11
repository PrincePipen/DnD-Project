import React, { createContext, useContext, useEffect, useState } from 'react';
import { Howl } from 'howler';

const AudioContext = createContext<{
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  playEffect: (effect: string) => void;
}>({
  soundEnabled: true,
  setSoundEnabled: () => {},
  playEffect: () => {},
});

import { ReactNode } from 'react';

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientSound, setAmbientSound] = useState<Howl | null>(null);
  const [effectSounds, setEffectSounds] = useState<{ [key: string]: Howl }>({});

  useEffect(() => {
    if (soundEnabled) {
      const ambient = new Howl({
        src: ['/assets/audio/ambient/your-ambient-sound.mp3'],
        loop: true,
        volume: 0.5,
      });
      setAmbientSound(ambient);
      ambient.play();
    } else {
      ambientSound?.pause();
    }

    return () => {
      ambientSound?.unload();
    };
  }, [soundEnabled]);

  const playEffect = (effect: string) => {
    if (soundEnabled && effectSounds[effect]) {
      effectSounds[effect].play();
    }
  };

  const loadEffectSounds = () => {
    const sounds = {
      roll: new Howl({ src: ['/assets/audio/effects/dice-roll.mp3'] }),
      spell: new Howl({ src: ['/assets/audio/effects/spell-cast.mp3'] }),
      // Add more effects as needed
    };
    setEffectSounds(sounds);
  };

  useEffect(() => {
    loadEffectSounds();
  }, []);

  return (
    <AudioContext.Provider value={{ soundEnabled, setSoundEnabled, playEffect }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};