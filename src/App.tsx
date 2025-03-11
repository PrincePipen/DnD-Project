import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sword, Scroll, User, Settings as SettingsIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import CharacterCreation from './pages/CharacterCreation';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/character" element={<CharacterCreation />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
