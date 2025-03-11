import React from 'react';
import { useInventoryStore } from '../../store/inventory-store';
import { cn } from '../../lib/utils';

interface InventoryItemProps {
  itemId: string;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ itemId }) => {
  const { items, removeItem } = useInventoryStore((state) => ({
    items: state.items,
    removeItem: state.removeItem,
  }));

  const item = items.find((item) => item.id === itemId);

  if (!item) return null;

  const handleRemove = () => {
    removeItem(itemId);
  };

  return (
    <div className={cn("flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105")}>
      <div className="flex items-center space-x-4">
        <img src={item.icon} alt={item.name} className="w-12 h-12" />
        <div>
          <h3 className="text-lg font-bold text-white">{item.name}</h3>
          <p className="text-gray-300">{item.description}</p>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
      >
        Remove
      </button>
    </div>
  );
};

export default InventoryItem;