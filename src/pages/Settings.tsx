import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-medieval font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
        Settings
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Game Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Enable sound effects</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Enable background music</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">AI Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                AI Response Speed
              </label>
              <select className="input w-full">
                <option value="fast">Fast</option>
                <option value="balanced">Balanced</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
