import React from 'react';
import { useCombatStore } from '../../store/combat-store';
import { cn } from '../../lib/utils';

const CombatLog = () => {
  const { combatLog } = useCombatStore();

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-2">Combat Log</h2>
      <div className="max-h-60 overflow-y-auto">
        {combatLog.length === 0 ? (
          <p className="text-gray-400">No actions yet...</p>
        ) : (
          combatLog.map((entry, index) => (
            <p key={index} className={cn("text-gray-300", index % 2 === 0 ? "bg-gray-700" : "bg-gray-600", "p-2 rounded-md")}>
              {entry}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default CombatLog;