import { Character, InventoryItemType } from '../types/character';

type StatBlock = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export const generateInitialStats = ({ race, class: characterClass }: Pick<Character, 'race' | 'class'>) => {
  const baseStats: StatBlock = {
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      constitution: 0
  };

  // Apply racial bonuses
  switch (race) {
    case 'human':
      (Object.keys(baseStats) as (keyof StatBlock)[]).forEach(stat => baseStats[stat] += 1);
      break;
    case 'elf':
      baseStats.dexterity += 2;
      baseStats.intelligence += 1;
      break;
    case 'dwarf':
      baseStats.constitution += 2;
      baseStats.strength += 1;
      break;
    case 'halfling':
      baseStats.dexterity += 2;
      baseStats.charisma += 1;
      break;
  }

  // Apply class bonuses
  switch (characterClass) {
    case 'fighter':
      baseStats.strength += 2;
      break;
    case 'wizard':
      baseStats.intelligence += 2;
      break;
    case 'rogue':
      baseStats.dexterity += 2;
      break;
    case 'cleric':
      baseStats.wisdom += 2;
      break;
  }

  return baseStats;
};

export const generateStartingInventory = (characterClass: string): InventoryItemType[] => {
  const baseInventory: InventoryItemType[] = [
    {
      id: 'backpack',
      name: 'Backpack',
      description: 'A sturdy leather backpack',
      type: 'tool',
      quantity: 1
    },
    {
      id: 'rations',
      name: 'Trail Rations',
      description: 'Enough food for 5 days',
      type: 'tool',
      quantity: 5
    }
  ];

  // Add class-specific items
  const classItems: Record<string, InventoryItemType[]> = {
    fighter: [
      {
        id: 'longsword',
        name: 'Longsword',
        description: 'A well-balanced sword',
        type: 'weapon',
        quantity: 1,
        stats: { damage: '1d8' }
      }
    ],
    wizard: [
      {
        id: 'staff',
        name: 'Wizard\'s Staff',
        description: 'A wooden staff for casting spells',
        type: 'weapon',
        quantity: 1,
        stats: { damage: '1d6' }
      }
    ],
    // Add other class items...
  };

  return [...baseInventory, ...(classItems[characterClass] || [])];
};

export const calculateInitialHealth = (characterClass: string): number => {
  const baseHealth: Record<string, number> = {
    fighter: 10,
    wizard: 6,
    rogue: 8,
    cleric: 8
  };
  return baseHealth[characterClass] || 8;
};