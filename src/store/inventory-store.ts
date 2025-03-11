import { create } from 'zustand';
import { InventoryItem } from '../types/game';

interface InventoryState {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: string) => void;
  clearInventory: () => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.id !== itemId)
  })),
  clearInventory: () => set({ items: [] }),
}));