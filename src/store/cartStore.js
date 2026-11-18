import { create } from 'zustand';

const STORAGE_KEY = 'assignment7-cart';
function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) =>
      Number.isFinite(item.id) && typeof item.title === 'string' &&
      Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0
    ).map(({ id, title, price, quantity }) => ({ id, title, price, quantity }));
  } catch { return []; }
}

export const useCartStore = create((set) => ({
  items: loadItems(),
  addItem: (product) => set((state) => {
    const found = state.items.some((item) => item.id === product.id);
    return { items: found
      ? state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...state.items, { id: product.id, title: product.title, price: product.price, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  setQuantity: (id, quantity) => set((state) => ({
    items: quantity < 1
      ? state.items.filter((item) => item.id !== id)
      : state.items.map((item) => item.id === id ? { ...item, quantity: Math.floor(quantity) } : item),
  })),
  clear: () => set({ items: [] }),
}));

// Subscribe outside React, as required by the assignment.
useCartStore.subscribe((state, previous) => {
  if (state.items !== previous.items) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)); }
    catch { /* Storage unavailable; cart remains usable in memory. */ }
  }
});
