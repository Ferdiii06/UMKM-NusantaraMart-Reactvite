import { useContext } from 'react';
import { CartContext } from './Context'; // Import dari file terpisah

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}