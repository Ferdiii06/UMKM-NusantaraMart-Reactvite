import { useState, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { type Product, productsData } from "../data/products";
import gsap from "gsap";

// Card Component untuk menampilkan setiap produk
function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);
  
  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    addToCart(product, qty);
    setQty(1);

    // Flying animation
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon || !imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = imgRef.current.cloneNode(true) as HTMLImageElement;
    flyingImg.style.position = "fixed";
    flyingImg.style.left = `${imgRect.left}px`;
    flyingImg.style.top = `${imgRect.top}px`;
    flyingImg.style.width = `${imgRect.width}px`;
    flyingImg.style.height = `${imgRect.height}px`;
    flyingImg.style.zIndex = "9999";
    flyingImg.style.pointerEvents = "none";
    flyingImg.style.borderRadius = "12px";
    
    document.body.appendChild(flyingImg);

    gsap.to(flyingImg, {
      x: cartRect.left - imgRect.left,
      y: cartRect.top - imgRect.top,
      scale: 0.1,
      opacity: 0.5,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        flyingImg.remove();
        
        // Pop animation for the cart icon itself
        gsap.fromTo(cartIcon, 
          { scale: 1.3 }, 
          { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 p-4 md:p-5 flex flex-col">
      
      {/* Container Gambar */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="h-32 md:h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-4 cursor-pointer hover:opacity-90 transition"
      >
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="h-full object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Nama Produk */}
      <h3 
        onClick={() => navigate(`/product/${product.id}`)}
        className="text-base md:text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-green-600 transition"
      >
        {product.name}
      </h3>
      <p className="text-xs md:text-sm text-gray-500 mb-2">{product.weight}</p>
      <p className="text-xl md:text-2xl font-bold text-green-600 mb-4">
        Rp {formatRupiah(product.price)}
      </p>

      {/* Action Buttons */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
          <button
            onClick={decrease}
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-500 hover:text-green-600"
          >
            -
          </button>
          <span className="w-6 md:w-8 text-center font-medium text-sm md:text-base">
            {qty}
          </span>
          <button
            onClick={increase}
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-500 hover:text-green-600"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-green-500 hover:bg-green-600 text-white p-2.5 md:p-3 rounded-full transition shadow-md hover:scale-105"
        >
          <ShoppingCart size={16} className="md:w-[18px]" />
        </button>
      </div>
    </div>
  );
}

// Main component
export default function Product() {
  const navigate = useNavigate();
  
  // Hanya tampilkan 8 produk pertama di halaman utama
  const featuredProducts = productsData.slice(0, 8);

  return (
    <section id="product" className="w-full bg-gray-50 py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Produk Populer
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Temukan produk lokal terbaik pilihan pelanggan kami
            </p>
          </div>

          {/* Tombol Selengkapnya - navigasi ke halaman semua produk */}
          <button 
            onClick={() => navigate('/products')}
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-medium transition shadow-md hover:scale-105"
          >
            Selengkapnya
          </button>
        </div>

        {/* Grid System - 8 produk */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}