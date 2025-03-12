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
  lastScene?: string;
  lastChoices?: string[];
  gameLog?: string[];
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
  deleteCharacter: (id: string) => void;
  saveCharacterProgress: (characterId: string, scene: string, choices: string[], log: string[]) => void;
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
      setActiveCharacter: (character) => set({ 
        activeCharacter: character,
        currentScene: character.lastScene || '',
        choices: character.lastChoices || [],
        gameLog: character.gameLog || []
      }),
      updateScene: (scene) => set({ currentScene: scene }),
      addToLog: (entry) =>
        set((state) => ({ gameLog: [...state.gameLog, entry] })),
      setChoices: (choices) => set({ choices }),
      setLoading: (loading) => set({ isLoading: loading }),
      deleteCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((char) => char.id !== id),
          activeCharacter: state.activeCharacter?.id === id ? null : state.activeCharacter,
        })),
      saveCharacterProgress: (characterId, scene, choices, log) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? { ...char, lastScene: scene, lastChoices: choices, gameLog: log }
              : char
          ),
        })),
    }),
    {
      name: 'game-storage',
    }
  )
);
