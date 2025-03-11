import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Character } from '../types/character';

interface GameState {
  character: Character | null;
  currentScene: string;
  gameLog: string[];
  questProgress: number;
  setCharacter: (character: Character) => void;
  updateScene: (scene: string) => void;
  addToLog: (entry: string) => void;
  setQuestProgress: (progress: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      character: null,
      currentScene: '',
      gameLog: [],
      questProgress: 0,
      setCharacter: (character) => set({ character }),
      updateScene: (scene) => set({ currentScene: scene }),
      addToLog: (entry) => set((state) => ({ gameLog: [...state.gameLog, entry] })),
      setQuestProgress: (progress) => set({ questProgress: progress }),
    }),
    {
      name: 'dnd-game-storage',
    }
  )
);
