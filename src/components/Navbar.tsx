import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Scroll, User, Settings as SettingsIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-amber-900/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Sword className="w-8 h-8 text-amber-500 transform group-hover:rotate-12 transition-transform duration-200" />
            <span className="text-xl font-medieval bg-gradient-to-r from-amber-400 to-red-600 text-transparent bg-clip-text">
              Taka's DnD Game
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/game" className="nav-link group">
              <Scroll className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />
              <span className="text-amber-400 group-hover:text-amber-300">Play</span>
            </Link>
            <Link to="/character" className="nav-link group">
              <User className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />
              <span className="text-amber-400 group-hover:text-amber-300">Character</span>
            </Link>
            <Link to="/settings" className="nav-link group">
              <SettingsIcon className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />
              <span className="text-amber-400 group-hover:text-amber-300">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
