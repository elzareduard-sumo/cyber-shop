import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  title: '',
  categoryId: '',
  price: '',
  
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  
  resetFilters: () => set({ title: '', categoryId: '', price: '' }),
}));