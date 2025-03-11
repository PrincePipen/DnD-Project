import { create } from 'zustand';

interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}

interface GameState {
  character: Character | null;
  currentScene: string;
  gameLog: string[];
  setCharacter: (character: Character) => void;
  updateScene: (scene: string) => void;
  addToLog: (entry: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  character: null,
  currentScene: '',
  gameLog: [],
  setCharacter: (character) => set({ character }),
  updateScene: (scene) => set({ currentScene: scene }),
  addToLog: (entry) => set((state) => ({ gameLog: [...state.gameLog, entry] })),
}));
