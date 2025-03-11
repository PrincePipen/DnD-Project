import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CharacterSheet from './pages/CharacterSheet';
import DungeonExplorer from './pages/DungeonExplorer';
import Inventory from './pages/Inventory';
import StoryJournal from './pages/StoryJournal';
import { PageTransition } from './components/animations/PageTransition';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <PageTransition>
            <Routes>
              <Route path="/" element={<DungeonExplorer />} />
              <Route path="/character" element={<CharacterSheet />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/story" element={<StoryJournal />} />
            </Routes>
          </PageTransition>
        </main>
      </div>
    </Router>
  );
}

export default App;