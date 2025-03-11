import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/game-store';
import { motion } from 'framer-motion';
import { Card } from '../components/shared/Card';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const setCharacter = useGameStore((state) => state.setCharacter);
  const [formData, setFormData] = useState({
    name: '',
    race: 'human',
    class: 'fighter',
  });

  const [step, setStep] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);

  const races = [
    { value: 'human', name: 'Human', desc: 'Versatile and adaptable' },
    { value: 'elf', name: 'Elf', desc: 'Graceful and long-lived' },
    { value: 'dwarf', name: 'Dwarf', desc: 'Hardy and steadfast' },
    { value: 'halfling', name: 'Halfling', desc: 'Small but brave' },
  ];

  const classes = [
    { value: 'fighter', name: 'Fighter', desc: 'Master of weapons and combat' },
    { value: 'wizard', name: 'Wizard', desc: 'Wielder of arcane magic' },
    { value: 'rogue', name: 'Rogue', desc: 'Skilled in stealth and trickery' },
    { value: 'cleric', name: 'Cleric', desc: 'Divine spellcaster and healer' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnimation(true);
    
    // Generate random but balanced stats
    const generateStat = () => Math.floor(Math.random() * 6) + 8; // 8-13 range
    
    setTimeout(() => {
      setCharacter({
        ...formData,
        level: 1,
        stats: {
          strength: formData.class === 'fighter' ? generateStat() + 4 : generateStat(),
          dexterity: formData.class === 'rogue' ? generateStat() + 4 : generateStat(),
          constitution: formData.race === 'dwarf' ? generateStat() + 2 : generateStat(),
          intelligence: formData.class === 'wizard' ? generateStat() + 4 : generateStat(),
          wisdom: formData.class === 'cleric' ? generateStat() + 4 : generateStat(),
          charisma: formData.race === 'human' ? generateStat() + 2 : generateStat(),
        },
      });
      navigate('/game');
    }, 2000);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
        Create Your Character
      </h1>

      <Card className="p-6">
        {showAnimation ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div 
              className="w-24 h-24 rounded-full border-t-4 border-purple-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-xl">Creating your character...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
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
                <div className="mt-6 flex justify-end">
                  <motion.button 
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.name}
                    className="btn-primary px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Choose Your Race
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {races.map(race => (
                    <motion.div 
                      key={race.value} 
                      className={`p-4 rounded-lg cursor-pointer ${formData.race === race.value ? 'bg-purple-700 border-2 border-purple-400' : 'bg-gray-700'}`}
                      onClick={() => setFormData({ ...formData, race: race.value })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <h3 className="font-bold">{race.name}</h3>
                      <p className="text-sm text-gray-300">{race.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <motion.button 
                    type="button" 
                    onClick={prevStep}
                    className="btn bg-gray-700 text-white px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button 
                    type="button" 
                    onClick={nextStep}
                    className="btn-primary px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Choose Your Class
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {classes.map(cls => (
                    <motion.div 
                      key={cls.value} 
                      className={`p-4 rounded-lg cursor-pointer ${formData.class === cls.value ? 'bg-purple-700 border-2 border-purple-400' : 'bg-gray-700'}`}
                      onClick={() => setFormData({ ...formData, class: cls.value })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <h3 className="font-bold">{cls.name}</h3>
                      <p className="text-sm text-gray-300">{cls.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <motion.button 
                    type="button" 
                    onClick={prevStep}
                    className="btn bg-gray-700 text-white px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button 
                    type="submit"
                    className="btn-primary px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Character
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        )}
      </Card>
    </motion.div>
  );
};

export default CharacterCreation;
