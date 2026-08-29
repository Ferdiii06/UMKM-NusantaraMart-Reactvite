import { createContext } from 'react';
import type { CartContextType } from './CartContext';

// Buat context di file terpisah
export const CartContext = createContext<CartContextType | null>(null);