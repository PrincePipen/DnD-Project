import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Scroll, User, Settings as SettingsIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sword className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">AI Dungeon Master</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/game" className="nav-link">
              <Scroll className="w-5 h-5" />
              <span>Play</span>
            </Link>
            <Link to="/character" className="nav-link">
              <User className="w-5 h-5" />
              <span>Character</span>
            </Link>
            <Link to="/settings" className="nav-link">
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
