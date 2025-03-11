import React from 'react';
import { useGameStore } from '../store/game-store';
import { Card } from '../components/shared/Card';

const CharacterSheet = () => {
  const { character } = useGameStore();

  // Placeholder character if none exists
  const displayCharacter = character || {
    name: "Example Character",
    race: "Human",
    class: "Fighter",
    level: 1,
    stats: {
      strength: 10,
      dexterity: 10, 
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
        Character Sheet
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-2xl font-bold mb-4">Character Info</h2>
          <p><strong>Name:</strong> {displayCharacter.name}</p>
          <p><strong>Race:</strong> {displayCharacter.race}</p>
          <p><strong>Class:</strong> {displayCharacter.class}</p>
          <p><strong>Level:</strong> {displayCharacter.level}</p>
        </Card>

        <Card className="p-4">
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          <ul className="space-y-2">
            {Object.entries(displayCharacter.stats).map(([stat, value]) => (
              <li key={stat}>
                <strong>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</strong> {value}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {/* Level up logic */}}
          className="relative inline-flex items-center justify-center p-4 text-lg font-medium text-white bg-purple-600 rounded-md overflow-hidden group hover:bg-purple-700 transition-all duration-300"
        >
          <span className="absolute inset-0 w-full h-full transition-transform duration-300 transform scale-110 bg-purple-500 rounded-md group-hover:scale-125"></span>
          <span className="relative z-10">Level Up</span>
        </button>
      </div>
    </div>
  );
};

export default CharacterSheet;