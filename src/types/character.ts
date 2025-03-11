export interface Character {
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
  inventory: InventoryItemType[];
  experience: number;
  health: number;
  maxHealth: number;
}

export interface InventoryItemType {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'potion' | 'tool' | 'treasure';
  quantity: number;
  stats?: Record<string, number | string>;
}