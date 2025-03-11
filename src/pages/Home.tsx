import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Shield, Scroll } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Welcome to AI Dungeon Master
        </h1>
        
        <p className="text-xl text-gray-300">
          Embark on an epic journey where artificial intelligence brings your D&D adventures to life.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon={<Sword className="w-8 h-8 text-purple-500" />}
            title="AI-Powered Stories"
            description="Experience dynamic narratives that adapt to your choices"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-purple-500" />}
            title="Character Creation"
            description="Create and customize your unique hero"
          />
          <FeatureCard
            icon={<Scroll className="w-8 h-8 text-purple-500" />}
            title="Rich Lore"
            description="Immerse yourself in a deep, evolving world"
          />
        </div>
        
        <Link
          to="/character"
          className="inline-block mt-8 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-lg transition-colors duration-200"
        >
          Start Your Adventure
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors duration-200">
    <div className="flex flex-col items-center space-y-4">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

export default Home;
