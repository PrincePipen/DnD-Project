import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { Card } from '../components/shared/Card';
import Toast from '../components/ui/Toast';
import useAudio from '../services/audioService';

interface GroupedItems {
  [key: string]: InventoryItemType[];
}

type ItemCategoryType = 'weapon' | 'armor' | 'potion' | 'tool' | 'treasure';

export interface InventoryItemType {
  id: string;
  name: string;
  description: string;
  type: ItemCategoryType;
  quantity: number;
  stats?: Record<string, number | string>;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  inventory: InventoryItemType[];
}

interface GameState {
  character: Character | null;
  currentScene: string;
  gameLog: string[];
  setCharacter: (character: Character) => void;
  updateScene: (scene: string) => void;
  addToLog: (entry: string) => void;
}

// Define inventory item types and categories
const itemCategories = {
  weapon: { icon: '⚔️', label: 'Weapons' },
  armor: { icon: '🛡️', label: 'Armor' },
  potion: { icon: '🧪', label: 'Potions' },
  tool: { icon: '🔧', label: 'Tools' },
  treasure: { icon: '💎', label: 'Treasures' }
};

// Sample starting inventory
const defaultInventory: InventoryItemType[] = [
  {
    id: 'sword-rusty',
    name: 'Rusty Sword',
    description: 'A basic sword showing signs of wear.',
    type: 'weapon',
    quantity: 1,
    stats: { damage: '1d6' }
  },
  {
    id: 'potion-health',
    name: 'Health Potion',
    description: 'Restores 2d4+2 hit points when consumed.',
    type: 'potion',
    quantity: 2,
    stats: { healing: '2d4+2' }
  },
  {
    id: 'leather-armor',
    name: 'Leather Armor',
    description: 'Basic protection against physical damage.',
    type: 'armor',
    quantity: 1,
    stats: { armor: 11 }
  }
];


export const useGameStore = create<GameState>((set) => ({
  character: null,
  currentScene: 'start',
  gameLog: [],
  setCharacter: (character) => set({ character }),
  updateScene: (scene) => set({ currentScene: scene }),
  addToLog: (entry) => set((state) => ({ gameLog: [...state.gameLog, entry] })),
}));

const Inventory: React.FC = () => {
  const { character } = useGameStore();
  const { playSound } = useAudio();
  const [selectedItem, setSelectedItem] = useState<InventoryItemType | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Use character's inventory if it exists, otherwise use default
  const inventory = character?.inventory || defaultInventory;

  // Group items by category with proper typing
  const groupedItems = inventory.reduce<GroupedItems>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const handleItemClick = (item: InventoryItemType) => {
    setSelectedItem(item);
    playSound('ambient');
  };

  const handleUseItem = () => {
    if (!selectedItem) return;

    playSound('spell');
    setToastMessage(`Used ${selectedItem.name}`);
    setShowToast(true);

    // Handle item usage based on type
    switch (selectedItem.type) {
      case 'potion':
        handlePotionUse(selectedItem);
        break;
      case 'weapon':
        handleWeaponEquip(selectedItem);
        break;
      case 'armor':
        handleArmorEquip(selectedItem);
        break;
      default:
        handleGenericItemUse(selectedItem);
    }
  };

  const handlePotionUse = (potion: InventoryItemType) => {
    // Implementation for potion use
    console.log(`Using potion: ${potion.name}`);
  };

  const handleWeaponEquip = (weapon: InventoryItemType) => {
    // Implementation for weapon equipping
    console.log(`Equipping weapon: ${weapon.name}`);
  };

  const handleArmorEquip = (armor: InventoryItemType) => {
    // Implementation for armor equipping
    console.log(`Equipping armor: ${armor.name}`);
  };

  const handleGenericItemUse = (item: InventoryItemType) => {
    // Implementation for generic item use
    console.log(`Using item: ${item.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.h1 
        className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Inventory
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main inventory grid */}
        <motion.div 
          className="md:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Object.entries(itemCategories).map(([category, { icon, label }]) => (
            <Card key={category} className="p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>{icon}</span>
                {label}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {groupedItems[category]?.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors ${
                      selectedItem?.id === item.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => handleItemClick(item)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-2xl">{itemCategories[item.type].icon}</span>
                    </div>
                  </motion.div>
                ))}
                {!groupedItems[category]?.length && (
                  <p className="text-gray-400 col-span-2">No {label.toLowerCase()} in inventory</p>
                )}
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Item details sidebar */}
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="sticky top-4 p-4">
            <h2 className="text-2xl font-bold mb-4">Item Details</h2>
            
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {itemCategories[selectedItem.type].icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold">{selectedItem.name}</h3>
                      <p className="text-sm text-purple-300 capitalize">
                        {selectedItem.type}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300">{selectedItem.description}</p>
                  
                  {selectedItem.stats && (
                    <div className="mt-4 p-2 bg-gray-700 rounded">
                      <h4 className="font-semibold mb-2">Statistics</h4>
                      {Object.entries(selectedItem.stats).map(([stat, value]) => (
                        <p key={stat} className="text-sm text-gray-300">
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}: {value}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  <button
                    onClick={handleUseItem}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors duration-200"
                  >
                    {selectedItem.type === 'potion' ? 'Consume' : 'Equip'}
                  </button>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400"
                >
                  Select an item to view details
                </motion.p>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <Toast
            message={toastMessage}
            onClose={() => setShowToast(false)}
            duration={3000}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inventory;