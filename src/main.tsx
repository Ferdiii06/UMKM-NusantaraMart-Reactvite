import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Category from './components/Category'
import Product from './components/Product'
import Promo from './components/Promo'
import Contact from './components/Contact'

import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Navbar/>
      <App />
      <Category />
      <Product/>
      <Promo/>
      <Contact/>
      <Footer/>
    </CartProvider>
  </StrictMode>,
)
