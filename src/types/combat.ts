export interface CombatAction {
  name: string;
  damage: number;
  type: 'melee' | 'ranged' | 'magic';
  description: string;
}

export interface Combatant {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  actions: CombatAction[];
}

export interface CombatState {
  combatants: Combatant[];
  turnOrder: string[];
  currentTurnIndex: number;
  isCombatActive: boolean;
}

export type DamageCalculation = (attacker: Combatant, defender: Combatant, action: CombatAction) => number;