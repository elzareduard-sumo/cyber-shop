import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFilterStore = create(
  persist(
    (set) => ({
      title: '',
      categoryId: '',
      price: '',

      setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),

      resetFilters: () => set({ title: '', categoryId: '', price: '' }),
    }),
    {
      name: 'catalog-filters',
    }
  )
);
