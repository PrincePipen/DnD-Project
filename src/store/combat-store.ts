import { create } from 'zustand';

interface Combatant {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  actions: string[];
}

interface CombatState {
  combatants: Combatant[];
  currentTurnIndex: number;
  addCombatant: (combatant: Combatant) => void;
  removeCombatant: (id: string) => void;
  takeDamage: (id: string, damage: number) => void;
  nextTurn: () => void;
}

export const useCombatStore = create<CombatState>((set) => ({
  combatants: [],
  currentTurnIndex: 0,
  addCombatant: (combatant) => set((state) => ({
    combatants: [...state.combatants, combatant],
  })),
  removeCombatant: (id) => set((state) => ({
    combatants: state.combatants.filter(combatant => combatant.id !== id),
  })),
  takeDamage: (id, damage) => set((state) => ({
    combatants: state.combatants.map(combatant => 
      combatant.id === id 
        ? { ...combatant, health: Math.max(combatant.health - damage, 0) } 
        : combatant
    ),
  })),
  nextTurn: () => set((state) => ({
    currentTurnIndex: (state.currentTurnIndex + 1) % state.combatants.length,
  })),
}));