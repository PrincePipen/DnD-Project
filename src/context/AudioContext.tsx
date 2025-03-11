import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';

// Define a type for sound categories
type SoundEffect = 'roll' | 'spell' | 'hit' | 'potion' | 'success' | 'failure';
type AmbientSound = 'dungeon' | 'forest' | 'tavern' | 'battle';

interface AudioContextType {
  soundEnabled: boolean;
  musicEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  playEffect: (effect: SoundEffect) => void;
  playAmbient: (ambient: AmbientSound) => void;
  stopAmbient: () => void;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const AudioContext = createContext<AudioContextType>({
  soundEnabled: true,
  musicEnabled: true,
  setSoundEnabled: () => {},
  setMusicEnabled: () => {},
  playEffect: () => {},
  playAmbient: () => {},
  stopAmbient: () => {},
  volume: 0.5,
  setVolume: () => {}
});

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const currentAmbientRef = useRef<Howl | null>(null);
  const effectSoundsRef = useRef<Record<string, Howl>>({});

  // Initialize sound effects
  useEffect(() => {
    // Load sound effects only once
    if (Object.keys(effectSoundsRef.current).length === 0) {
      effectSoundsRef.current = {
        roll: new Howl({ src: ['/assets/audio/effects/dice-roll.mp3'], volume }),
        spell: new Howl({ src: ['/assets/audio/effects/spell-cast.mp3'], volume }),
        hit: new Howl({ src: ['/assets/audio/effects/hit.mp3'], volume }),
        potion: new Howl({ src: ['/assets/audio/effects/potion.mp3'], volume }),
        success: new Howl({ src: ['/assets/audio/effects/success.mp3'], volume }),
        failure: new Howl({ src: ['/assets/audio/effects/failure.mp3'], volume }),
      };
    }
    
    // Update volumes when volume state changes
    Object.values(effectSoundsRef.current).forEach(sound => {
      sound.volume(soundEnabled ? volume : 0);
    });
    
    if (currentAmbientRef.current) {
      currentAmbientRef.current.volume(musicEnabled ? volume : 0);
    }
  }, [volume, soundEnabled, musicEnabled]);

  const playEffect = (effect: SoundEffect) => {
    if (soundEnabled && effectSoundsRef.current[effect]) {
      effectSoundsRef.current[effect].play();
    }
  };

  const playAmbient = (ambient: AmbientSound) => {
    // Stop current ambient if any
    if (currentAmbientRef.current) {
      currentAmbientRef.current.stop();
    }
    
    if (musicEnabled) {
      // Create and play new ambient
      const ambientSound = new Howl({
        src: [`/assets/audio/ambient/${ambient}.mp3`],
        loop: true,
        volume: volume,
      });
      
      currentAmbientRef.current = ambientSound;
      ambientSound.play();
    }
  };

  const stopAmbient = () => {
    if (currentAmbientRef.current) {
      currentAmbientRef.current.stop();
      currentAmbientRef.current = null;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (currentAmbientRef.current) {
        currentAmbientRef.current.stop();
      }
    };
  }, []);

  return (
    <AudioContext.Provider 
      value={{ 
        soundEnabled, 
        musicEnabled,
        setSoundEnabled, 
        setMusicEnabled,
        playEffect, 
        playAmbient, 
        stopAmbient,
        volume,
        setVolume
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);