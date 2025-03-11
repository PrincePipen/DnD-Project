import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Character {
  id: string;
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
  createdAt: string;
}

interface GameState {
  characters: Character[];
  activeCharacter: Character | null;
  currentScene: string;
  gameLog: string[];
  choices: string[];
  isLoading: boolean;
  addCharacter: (character: Omit<Character, 'id' | 'createdAt'>) => void;
  setActiveCharacter: (character: Character) => void;
  updateScene: (scene: string) => void;
  addToLog: (entry: string) => void;
  setChoices: (choices: string[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      characters: [],
      activeCharacter: null,
      currentScene: '',
      gameLog: [],
      choices: [],
      isLoading: false,
      addCharacter: (character) =>
        set((state) => ({
          characters: [
            ...state.characters,
            {
              ...character,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      setActiveCharacter: (character) => set({ activeCharacter: character }),
      updateScene: (scene) => set({ currentScene: scene }),
      addToLog: (entry) =>
        set((state) => ({ gameLog: [...state.gameLog, entry] })),
      setChoices: (choices) => set({ choices }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'game-storage',
    }
  )
);
