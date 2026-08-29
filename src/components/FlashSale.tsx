import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/products";
import { useCart } from "../context/useCart";
import { Clock, Zap, ShoppingCart } from "lucide-react";

export default function FlashSale() {
  const { addToCart } = useCart();
  
  // Ambil 4 produk acak untuk flash sale
  const flashSaleProducts = productsData.slice(0, 4).map(product => ({
    ...product,
    originalPrice: product.price,
    price: Math.floor(product.price * 0.5) // Diskon 50%
  }));

  // State untuk countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 50
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        
        let h = prev.hours;
        let m = prev.minutes;
        let s = prev.seconds - 1;
        
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toLocaleString('id-ID');
  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-10 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Flash Sale */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Zap className="text-red-500 fill-red-500" size={32} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Flash Sale</h2>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-red-100">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <Clock size={20} className="text-red-500" />
              <span>Berakhir dalam:</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg">
                {formatTime(timeLeft.hours)}
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg">
                {formatTime(timeLeft.minutes)}
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg">
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Produk Flash Sale */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-100 group relative">
              {/* Badge Diskon */}
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                50% OFF
              </div>
              
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-800 mb-1 truncate hover:text-red-500 transition">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-500 mb-3">{product.weight}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-400 line-through mb-1">
                    Rp {formatNumber(product.originalPrice)}
                  </p>
                  <p className="text-lg font-bold text-red-600">
                    Rp {formatNumber(product.price)}
                  </p>
                </div>

                <div className="mb-4 bg-red-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-full w-3/4"></div>
                </div>
                <p className="text-xs text-red-500 font-medium mb-4 text-center">Tersisa 5 barang!</p>
                
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 hover:border-red-500 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <ShoppingCart size={18} className="group-hover/btn:-translate-y-1 transition-transform" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
