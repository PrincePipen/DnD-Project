import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, Shield, Heart, Brain, Star } from 'lucide-react';
import { useGameStore } from '../store/game-store';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { addCharacter, setActiveCharacter, characters } = useGameStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    race: 'human',
    class: 'fighter',
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const character = {
      ...formData,
      level: 1,
    };
    addCharacter(character);
    setActiveCharacter({
      ...character,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
    navigate('/game');
  };

  const updateStat = (stat: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: Math.max(8, Math.min(18, value)),
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8"
      >
        Create Your Character
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
      >
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Character Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Race
              </label>
              <select
                value={formData.race}
                onChange={(e) =>
                  setFormData({ ...formData, race: e.target.value })
                }
                className="input w-full"
              >
                <option value="human">Human</option>
                <option value="elf">Elf</option>
                <option value="dwarf">Dwarf</option>
                <option value="halfling">Halfling</option>
                <option value="dragonborn">Dragonborn</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Class
              </label>
              <select
                value={formData.class}
                onChange={(e) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                className="input w-full"
              >
                <option value="fighter">Fighter</option>
                <option value="wizard">Wizard</option>
                <option value="rogue">Rogue</option>
                <option value="cleric">Cleric</option>
                <option value="paladin">Paladin</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full"
            >
              Next: Ability Scores
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-medieval font-bold mb-4">
              Ability Scores
            </h2>

            {Object.entries(formData.stats).map(([stat, value]) => (
              <div key={stat} className="flex items-center space-x-4">
                <span className="w-32 capitalize">{stat}</span>
                <button
                  onClick={() => updateStat(stat, value - 1)}
                  className="btn bg-gray-700 hover:bg-gray-600"
                >
                  -
                </button>
                <span className="w-12 text-center">{value}</span>
                <button
                  onClick={() => updateStat(stat, value + 1)}
                  className="btn bg-gray-700 hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            ))}

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="btn bg-gray-700 hover:bg-gray-600 w-1/2"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary w-1/2"
              >
                Create Character
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {characters.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
        >
          <h2 className="text-2xl font-medieval font-bold mb-4">
            Your Characters
          </h2>
          <div className="grid gap-4">
            {characters.map((char) => (
              <motion.div
                key={char.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-700 rounded-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold">{char.name}</h3>
                  <p className="text-sm text-gray-400">
                    Level {char.level} {char.race} {char.class}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveCharacter(char);
                    navigate('/game');
                  }}
                  className="btn-primary"
                >
                  Select
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CharacterCreation;
