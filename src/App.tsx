import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import CharacterCreation from './pages/CharacterCreation';
import Settings from './pages/Settings';
import CharacterSheet from './pages/CharacterSheet';
import DungeonExplorer from './pages/DungeonExplorer';
import Inventory from './pages/Inventory';
import StoryJournal from './pages/StoryJournal';
// Import as named export
import { PageTransition } from './components/animations/PageTransition';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/character" element={<CharacterCreation />} />
              <Route path="/character-sheet" element={<CharacterSheet />} />
              <Route path="/dungeon" element={<DungeonExplorer />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/story" element={<StoryJournal />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </PageTransition>
        </main>
      </div>
    </Router>
  );
}

export default App;

// File structure
// public/
//   assets/
//     images/
//       backgrounds/
//         dungeon-map.png
//       characters/
//         warrior.png
//         wizard.png
//         rogue.png
//         cleric.png
//     audio/
//       ambient/
//         dungeon.mp3
//         forest.mp3
//       effects/
//         dice-roll.mp3
//         spell-cast.mp3