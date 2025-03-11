import { useEffect } from 'react';
import { Character } from '../types/character';

const STORAGE_KEY = 'dnd-game-state';

interface GameState {
  character: Character | null;
  currentScene: string;
  gameLog: string[];
  questProgress: number;
}

export const saveGameState = (state: Partial<GameState>) => {
  const currentState = loadGameState();
  const newState = { ...currentState, ...state };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
};

export const loadGameState = (): GameState => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  return savedState ? JSON.parse(savedState) : {
    character: null,
    currentScene: '',
    gameLog: [],
    questProgress: 0
  };
};

export const clearGameState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const useGameStorage = (initialState: (state: GameState) => void) => {
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      initialState(savedState);
    }
  }, [initialState]);

  const saveState = (state: Partial<GameState>) => {
    saveGameState(state);
  };

  const clearState = () => {
    clearGameState();
  };

  return { saveState, clearState };
};