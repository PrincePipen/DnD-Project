export interface GameState {
  player: PlayerData;
  settings: GameSettings;
  currentScene: string;
  gameLog: string[];
  isPaused: boolean;
}

export interface PlayerData {
  id: string;
  name: string;
  level: number;
  experience: number;
  health: number;
  inventory: InventoryItem[];
  characterClass: string;
  race: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  description: string;
}