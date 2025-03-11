import React from 'react';
import { useInventoryStore } from '../store/inventory-store';
import InventoryItem from '../components/game/InventoryItem';

const Inventory = () => {
  const { items } = useInventoryStore();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
        Your Inventory
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-300 text-center">Your inventory is empty.</p>
        ) : (
          items.map((item) => (
            <InventoryItem key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Inventory;