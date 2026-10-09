import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MobileModel, ComponentItem } from '../types';
import { getModelById, MODELS_DATA } from '../data/modelsData';
import { getComponentById } from '../data/componentsService';

interface AppContextType {
  favourites: string[];
  toggleFavourite: (componentId: string) => void;
  isFavourite: (componentId: string) => boolean;
  clearFavourites: () => void;
  getFavouriteComponents: () => ComponentItem[];
  
  recentlyViewedModelIds: string[];
  addRecentlyViewedModel: (modelId: string) => void;
  clearRecentlyViewed: () => void;
  getRecentlyViewedModels: () => MobileModel[];

  compareModel1Id: string;
  compareModel2Id: string;
  setCompareModel1Id: (modelId: string) => void;
  setCompareModel2Id: (modelId: string) => void;

  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FAVOURITES_KEY = 'mcf_favourites_v1';
const RECENT_MODELS_KEY = 'mcf_recent_models_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Favourites in localStorage
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVOURITES_KEY);
      return stored ? JSON.parse(stored) : [
        'samsung-galaxy-s24-display-screen',
        'apple-iphone-16-battery',
        'oneplus-12-charging-board'
      ];
    } catch {
      return ['samsung-galaxy-s24-display-screen', 'apple-iphone-16-battery'];
    }
  });

  // Recently viewed models in localStorage
  const [recentlyViewedModelIds, setRecentlyViewedModelIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_MODELS_KEY);
      return stored ? JSON.parse(stored) : [
        'samsung-galaxy-s24',
        'apple-iphone-16',
        'oneplus-12',
        'google-pixel-9-pro'
      ];
    } catch {
      return ['samsung-galaxy-s24', 'apple-iphone-16'];
    }
  });

  // Comparison models
  const [compareModel1Id, setCompareModel1Id] = useState<string>('samsung-galaxy-s24');
  const [compareModel2Id, setCompareModel2Id] = useState<string>('apple-iphone-16');

  // Global search input
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Persist favourites
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    } catch (e) {
      console.warn('Failed to save favourites to localStorage', e);
    }
  }, [favourites]);

  // Persist recent models
  useEffect(() => {
    try {
      localStorage.setItem(RECENT_MODELS_KEY, JSON.stringify(recentlyViewedModelIds));
    } catch (e) {
      console.warn('Failed to save recent models to localStorage', e);
    }
  }, [recentlyViewedModelIds]);

  const toggleFavourite = (componentId: string) => {
    setFavourites((prev) =>
      prev.includes(componentId) ? prev.filter((id) => id !== componentId) : [...prev, componentId]
    );
  };

  const isFavourite = (componentId: string) => {
    return favourites.includes(componentId);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const getFavouriteComponents = (): ComponentItem[] => {
    const items: ComponentItem[] = [];
    for (const id of favourites) {
      const comp = getComponentById(id);
      if (comp) items.push(comp);
    }
    return items;
  };

  const addRecentlyViewedModel = (modelId: string) => {
    setRecentlyViewedModelIds((prev) => {
      const filtered = prev.filter((id) => id !== modelId);
      return [modelId, ...filtered].slice(0, 8); // keep last 8
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedModelIds([]);
  };

  const getRecentlyViewedModels = (): MobileModel[] => {
    const list: MobileModel[] = [];
    for (const id of recentlyViewedModelIds) {
      const m = getModelById(id);
      if (m) list.push(m);
    }
    return list;
  };

  return (
    <AppContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        clearFavourites,
        getFavouriteComponents,
        recentlyViewedModelIds,
        addRecentlyViewedModel,
        clearRecentlyViewed,
        getRecentlyViewedModels,
        compareModel1Id,
        compareModel2Id,
        setCompareModel1Id,
        setCompareModel2Id,
        globalSearchQuery,
        setGlobalSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
