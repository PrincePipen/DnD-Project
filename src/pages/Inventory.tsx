import { useState } from 'react';
import { useGameStore } from '../store/game-store';
import { Card } from '../components/shared/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { InventoryItemType } from '../types/character';
import { cn } from '../lib/utils';

const itemCategories = {
  weapon: { icon: '⚔️', label: 'Weapons' },
  armor: { icon: '🛡️', label: 'Armor' },
  potion: { icon: '🧪', label: 'Potions' },
  tool: { icon: '🔧', label: 'Tools' },
  treasure: { icon: '💎', label: 'Treasures' }
};

const Inventory = () => {
  const { character } = useGameStore();
  const [selectedItem, setSelectedItem] = useState<InventoryItemType | null>(null);

  // Group items by category
  const groupedItems = character?.inventory.reduce<Record<string, InventoryItemType[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {}) || {};

  const handleItemClick = (item: InventoryItemType) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.h1 
        className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {character?.name}'s Inventory
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main inventory grid */}
        <motion.div 
          className="md:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
                    className={cn(
                      "p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors",
                      selectedItem?.id === item.id && "ring-2 ring-purple-500"
                    )}
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
    </div>
  );
};

export default Inventory;