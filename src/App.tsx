import { useEffect, useState } from "react";
import { SearchEngines } from "./utils/searchEngines";
import {
  SearchPreferences,
  getSearchPreferences,
  setSearchPreferences,
} from "./utils/storage";

function App() {
  const [preferences, setPreferences] = useState<SearchPreferences>({});

  useEffect(() => {
    const loadPreferences = async () => {
      const prefs = await getSearchPreferences();
      setPreferences(prefs);
    };
    loadPreferences();
  }, []);

  const handleSwitchChange = async (id: string, checked: boolean) => {
    const newPreferences = { ...preferences, [id]: checked };
    setPreferences(newPreferences);
    await setSearchPreferences(newPreferences);
  };

  return (
      <div className="w-64 p-4 bg-white">
        <h1 className="text-lg font-bold mb-4">Multi-Platform Search</h1>
        <div className="space-y-3">
          {Object.entries(SearchEngines).map(([id, engine]) => (
              <label
                  key={id}
                  className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-2">
                  <img src={engine.iconUrl as string} alt={engine.name} className="w-4 h-4"/>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {engine.name}
              </span>
                </div>
                <div className="relative">
                  <input
                      type="checkbox"
                      checked={preferences[id] ?? true}
                      onChange={(e) => handleSwitchChange(id, e.target.checked)}
                      className="sr-only peer"
                  />
                  <div
                      className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Select text, right-click, and choose a search platform to quick search
        </p>
        <a href="https://buymeacoffee.com/ponyred/bunny-search" target="_blank" rel="noopener noreferrer">
          <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"
              style={{height: '60px !important', width: '217px !important'}}
          />
        </a>
      </div>
  );
}

export default App;
