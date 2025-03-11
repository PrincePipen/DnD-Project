import { useEffect } from 'react';

const audioFiles = {
  ambient: {
    forest: new Audio('/assets/audio/ambient/forest.mp3'),
    dungeon: new Audio('/assets/audio/ambient/dungeon.mp3'),
  },
  effects: {
    diceRoll: new Audio('/assets/audio/effects/dice-roll.mp3'),
    spellCast: new Audio('/assets/audio/effects/spell-cast.mp3'),
  },
};

const useAudio = () => {
  const playSound = (sound) => {
    if (audioFiles.effects[sound]) {
      audioFiles.effects[sound].currentTime = 0; // Reset sound to start
      audioFiles.effects[sound].play();
    }
  };

  const playAmbient = (ambient) => {
    if (audioFiles.ambient[ambient]) {
      audioFiles.ambient[ambient].loop = true; // Loop ambient sounds
      audioFiles.ambient[ambient].play();
    }
  };

  const stopAmbient = (ambient) => {
    if (audioFiles.ambient[ambient]) {
      audioFiles.ambient[ambient].pause();
      audioFiles.ambient[ambient].currentTime = 0; // Reset sound to start
    }
  };

  return { playSound, playAmbient, stopAmbient };
};

export default useAudio;