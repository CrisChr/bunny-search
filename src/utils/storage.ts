import { SearchEngines } from './searchEngines';

export interface SearchPreferences {
  [key: string]: boolean;
}

export const getSearchPreferences = async (): Promise<SearchPreferences> => {
  const result = await chrome.storage.sync.get('searchPreferences');
  if (!result.searchPreferences) {
    // Default all platforms to enabled
    const defaults = Object.keys(SearchEngines).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as SearchPreferences);

    await chrome.storage.sync.set({ searchPreferences: defaults });
    return defaults;
  }
  return result.searchPreferences;
};

export const setSearchPreferences = async (preferences: SearchPreferences): Promise<void> => {
  await chrome.storage.sync.set({ searchPreferences: preferences });
};