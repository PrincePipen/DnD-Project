import { useEffect } from 'react';
import { Howl } from 'howler';

// Map to store loaded audio files
const audioMap = new Map<string, Howl>();

// Current ambient track
let currentAmbient: Howl | null = null;

export const loadAudio = (key: string, src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: [src],
      preload: true,
      onload: () => {
        audioMap.set(key, sound);
        resolve();
      },
      onloaderror: (id, error) => {
        console.error(`Error loading audio ${key}:`, error);
        reject(error);
      }
    });
  });
};

export const preloadCommonAudio = async (): Promise<void> => {
  try {
    await Promise.all([
      loadAudio('dice', '/assets/audio/effects/dice-roll.mp3'),
      loadAudio('spell', '/assets/audio/effects/spell-cast.mp3'),
      loadAudio('ambient-dungeon', '/assets/audio/ambient/dungeon.mp3'),
      loadAudio('ambient-forest', '/assets/audio/ambient/forest.mp3'),
    ]);
    console.log('Audio preloaded successfully');
  } catch (error) {
    console.error('Failed to preload audio:', error);
  }
};

export const playSound = (key: string): void => {
  const sound = audioMap.get(key);
  if (sound) {
    sound.play();
  } else {
    console.warn(`Audio ${key} not found`);
  }
};

export const playAmbient = (key: string): void => {
  // Stop current ambient sound if playing
  if (currentAmbient) {
    currentAmbient.fade(currentAmbient.volume(), 0, 1000);
    setTimeout(() => currentAmbient?.stop(), 1000);
  }
  
  const sound = audioMap.get(key);
  if (sound) {
    sound.loop(true);
    sound.volume(0.3); // Lower volume for ambient sounds
    sound.play();
    currentAmbient = sound;
  } else {
    console.warn(`Ambient audio ${key} not found`);
  }
};

export const stopAmbient = (): void => {
  if (currentAmbient) {
    currentAmbient.fade(currentAmbient.volume(), 0, 1000);
    setTimeout(() => currentAmbient?.stop(), 1000);
    currentAmbient = null;
  }
};

const useAudio = () => {
  return { playSound, playAmbient, stopAmbient };
};

export default useAudio;