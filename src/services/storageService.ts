import { useEffect } from 'react';

const STORAGE_KEY = 'dnd-game-state';

export const saveGameState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadGameState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  return savedState ? JSON.parse(savedState) : null;
};

export const clearGameState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const useGameStorage = (initialState) => {
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      initialState(savedState);
    }
  }, [initialState]);

  const saveState = (state) => {
    saveGameState(state);
  };

  const clearState = () => {
    clearGameState();
  };

  return { saveState, clearState };
};