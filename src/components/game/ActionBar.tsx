import React from 'react';
import { useGameStore } from '../../store/combat-store';
import { cn } from '../../lib/utils';

const ActionBar = () => {
  const { currentAction, setAction } = useGameStore();

  const actions = [
    { name: 'Attack', value: 'attack' },
    { name: 'Defend', value: 'defend' },
    { name: 'Use Item', value: 'use_item' },
    { name: 'Cast Spell', value: 'cast_spell' },
  ];

  return (
    <div className="flex justify-around bg-gray-800 p-4 rounded-lg shadow-lg">
      {actions.map((action) => (
        <button
          key={action.value}
          className={cn(
            'px-4 py-2 rounded-md transition-colors duration-200',
            currentAction === action.value ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-purple-500'
          )}
          onClick={() => setAction(action.value)}
        >
          {action.name}
        </button>
      ))}
    </div>
  );
};

export default ActionBar;