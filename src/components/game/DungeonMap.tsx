import React from 'react';
import { useGameStore } from '../../store/game-store';
import { cn } from '../../lib/utils';

const DungeonMap = () => {
  const { currentScene } = useGameStore();

  return (
    <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
      <img
        src="/assets/images/backgrounds/dungeon-map.png"
        alt="Dungeon Map"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn("text-white text-2xl font-bold", currentScene ? "animate-pulse" : "opacity-50")}>
          {currentScene || "Explore the dungeon..."}
        </div>
      </div>
    </div>
  );
};

export default DungeonMap;