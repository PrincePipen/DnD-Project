export interface Stats {
  damage?: string;
  healing?: string;
  armor?: number;
}

export interface InventoryItemType {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'potion' | 'tool' | 'treasure';
  quantity: number;
  stats?: Stats;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  inventory: InventoryItemType[];
}