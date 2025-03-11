import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/game-store';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const setCharacter = useGameStore((state) => state.setCharacter);
  const [formData, setFormData] = useState({
    name: '',
    race: 'human',
    class: 'fighter',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCharacter({
      ...formData,
      level: 1,
      stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
    });
    navigate('/game');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
        Create Your Character
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Character Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="race" className="block text-sm font-medium text-gray-300 mb-2">
            Race
          </label>
          <select
            id="race"
            value={formData.race}
            onChange={(e) => setFormData({ ...formData, race: e.target.value })}
            className="input w-full"
          >
            <option value="human">Human</option>
            <option value="elf">Elf</option>
            <option value="dwarf">Dwarf</option>
            <option value="halfling">Halfling</option>
          </select>
        </div>

        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-300 mb-2">
            Class
          </label>
          <select
            id="class"
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="input w-full"
          >
            <option value="fighter">Fighter</option>
            <option value="wizard">Wizard</option>
            <option value="rogue">Rogue</option>
            <option value="cleric">Cleric</option>
          </select>
        </div>

        <button type="submit" className="btn-primary w-full">
          Create Character
        </button>
      </form>
    </div>
  );
};

export default CharacterCreation;
