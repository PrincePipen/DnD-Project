import React, { createContext, useContext, useEffect, useState } from 'react';
import * as audioService from '../services/audioService';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playEffect: (effectName: string) => void;
  playAmbient: (ambientName: string) => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
  playEffect: () => {},
  playAmbient: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadAudio = async () => {
      await audioService.preloadCommonAudio();
      setIsLoaded(true);
    };
    
    loadAudio();
    
    return () => {
      audioService.stopAmbient();
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    Howler.mute(!isMuted);
  };

  const playEffect = (effectName: string) => {
    if (!isMuted && isLoaded) {
      audioService.playSound(effectName);
    }
  };

  const playAmbient = (ambientName: string) => {
    if (!isMuted && isLoaded) {
      audioService.playAmbient(`ambient-${ambientName}`);
    }
  };

  const value = {
    isMuted,
    toggleMute,
    playEffect,
    playAmbient,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};