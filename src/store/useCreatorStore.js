import { create } from 'zustand';

export const useCreatorStore = create((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  filters: {
    categories: [],
    platforms: [],
    priceRange: [0, 10000],
    verifiedOnly: false,
    availableOnly: false,
  },
  
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  toggleArrayFilter: (key, value) => set((state) => {
    const current = state.filters[key];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
      
    return { filters: { ...state.filters, [key]: updated } };
  }),
  
  clearFilters: () => set({
    filters: {
      categories: [],
      platforms: [],
      priceRange: [0, 10000],
      verifiedOnly: false,
      availableOnly: false,
    },
    searchQuery: ''
  }),
  
  sortBy: 'Most Relevant',
  setSortBy: (sort) => set({ sortBy: sort }),
  
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
  
  isDarkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newMode };
  }),
}));
