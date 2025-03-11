import React from 'react';
import { useCharacterStats } from '../hooks/useCharacterStats';
import { Card } from '../components/shared/Card';
import { AnimatedButton } from '../components/shared/AnimatedButton';

const CharacterSheet = () => {
  const { character, updateCharacter } = useCharacterStats();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
        Character Sheet
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-2xl font-bold mb-4">Character Info</h2>
          <p><strong>Name:</strong> {character.name}</p>
          <p><strong>Race:</strong> {character.race}</p>
          <p><strong>Class:</strong> {character.class}</p>
          <p><strong>Level:</strong> {character.level}</p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          <ul className="space-y-2">
            {Object.entries(character.stats).map(([stat, value]) => (
              <li key={stat}>
                <strong>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</strong> {value}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Inventory</h2>
        <ul className="space-y-2">
          {character.inventory.map((item, index) => (
            <li key={index} className="text-gray-300">
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <AnimatedButton onClick={() => updateCharacter({ ...character, level: character.level + 1 })}>
          Level Up
        </AnimatedButton>
      </div>
    </div>
  );
};

export default CharacterSheet;