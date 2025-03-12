import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Heart, Brain, Star, Trash2, Play } from 'lucide-react';
import { useGameStore } from '../store/game-store';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { addCharacter, setActiveCharacter, characters, deleteCharacter } = useGameStore();
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

  const handleDeleteCharacter = (id: string) => {
    if (window.confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
      deleteCharacter(id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-medieval mb-8 text-center bg-gradient-to-r from-amber-400 to-red-600 text-transparent bg-clip-text"
      >
        Create Your Hero
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-amber-900/30"
      >
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medieval text-amber-400 mb-2">
                Hero's Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input w-full bg-gray-900 border-amber-900/50 focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medieval text-amber-400 mb-2">
                Race
              </label>
              <select
                value={formData.race}
                onChange={(e) =>
                  setFormData({ ...formData, race: e.target.value })
                }
                className="input w-full bg-gray-900 border-amber-900/50 focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="human">Human</option>
                <option value="elf">Elf</option>
                <option value="dwarf">Dwarf</option>
                <option value="halfling">Halfling</option>
                <option value="dragonborn">Dragonborn</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medieval text-amber-400 mb-2">
                Class
              </label>
              <select
                value={formData.class}
                onChange={(e) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                className="input w-full bg-gray-900 border-amber-900/50 focus:border-amber-500 focus:ring-amber-500"
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
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-medieval rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Next: Ability Scores
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-medieval text-amber-400 mb-4">
              Ability Scores
            </h2>

            {Object.entries(formData.stats).map(([stat, value]) => (
              <motion.div
                key={stat}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4"
              >
                <span className="w-32 capitalize font-medieval text-amber-400">{stat}</span>
                <button
                  onClick={() => updateStat(stat, value - 1)}
                  className="btn bg-gray-700 hover:bg-gray-600 text-amber-400"
                >
                  -
                </button>
                <span className="w-12 text-center text-amber-400">{value}</span>
                <button
                  onClick={() => updateStat(stat, value + 1)}
                  className="btn bg-gray-700 hover:bg-gray-600 text-amber-400"
                >
                  +
                </button>
              </motion.div>
            ))}

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/2 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-amber-400 font-medieval rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 py-3 px-4 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-medieval rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Create Hero
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {characters.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-amber-900/30"
        >
          <h2 className="text-2xl font-medieval text-amber-400 mb-4">
            Your Heroes
          </h2>
          <div className="grid gap-4">
            {characters.map((char) => (
              <motion.div
                key={char.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-900/50 rounded-lg border border-amber-900/30 hover:border-amber-500/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medieval text-amber-400">{char.name}</h3>
                    <p className="text-sm text-amber-300/70">
                      Level {char.level} {char.race} {char.class}
                    </p>
                    {char.lastScene && (
                      <p className="text-sm text-amber-300/50 mt-1">
                        Adventure in progress...
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setActiveCharacter(char);
                        navigate('/game');
                      }}
                      className="p-2 bg-amber-600 hover:bg-amber-500 rounded-lg transform hover:scale-110 transition-all duration-200"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCharacter(char.id)}
                      className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transform hover:scale-110 transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CharacterCreation;
