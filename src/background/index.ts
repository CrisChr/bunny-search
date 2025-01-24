import { SearchEngines } from '../utils/searchEngines';
import { getSearchPreferences } from '../utils/storage';

// Create context menu items
chrome.runtime.onInstalled.addListener(async () => {
  const preferences = await getSearchPreferences();

  Object.entries(SearchEngines).forEach(([id, engine]) => {
    if (preferences[id]) {
      chrome.contextMenus.create({
        id,
        title: `Search on ${engine.name}`,
        contexts: ['selection']
      });
    }
  });
});

// Update context menu when preferences change
chrome.storage.onChanged.addListener(async (changes) => {
  if (changes.searchPreferences) {
    // Remove all existing menu items
    await chrome.contextMenus.removeAll();

    // Create new menu items based on updated preferences
    const preferences = await getSearchPreferences();
    Object.entries(SearchEngines).forEach(([id, engine]) => {
      if (preferences[id]) {
        chrome.contextMenus.create({
          id,
          title: `Search on ${engine.name}`,
          contexts: ['selection']
        });
      }
    });
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info) => {
  const engine = SearchEngines[info.menuItemId as keyof typeof SearchEngines];
  if (engine && info.selectionText) {
    const searchUrl = engine.getSearchUrl(info.selectionText);
    chrome.tabs.create({ url: searchUrl });
  }
});