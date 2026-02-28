import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/useCart";
import { type Product, productsData } from "../data/products";

// Card Component untuk menampilkan setiap produk
function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();
  
  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  return (
    // Penyesuaian padding (p-4 di HP, p-5 di Laptop)
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 p-4 md:p-5 flex flex-col">
      
      {/* Container Gambar: Tinggi disesuaikan (h-32 di HP, h-40 di Laptop) */}
      <div className="h-32 md:h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Teks: Ukuran font mengecil di HP agar tidak berantakan */}
      <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
        {product.name}
      </h3>
      <p className="text-xs md:text-sm text-gray-500 mb-2">{product.weight}</p>
      <p className="text-xl md:text-2xl font-bold text-green-600 mb-4">
        Rp {product.price.toLocaleString('id-ID')}
      </p>

      {/* Action Buttons: Stack di HP sangat kecil, Baris di Laptop */}
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
          onClick={() => {
            addToCart(product, qty);
            setQty(1);
          }}
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
  return (
    <section className="w-full bg-gray-50 py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section: Flex-col di HP, Flex-row di Laptop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Produk Populer
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Temukan produk lokal terbaik pilihan pelanggan kami
            </p>
          </div>

          <button className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-medium transition shadow-md">
            Selengkapnya
          </button>
        </div>

        {/* Grid System: 
            - 2 kolom di HP (grid-cols-2)
            - 3 kolom di Tablet (md:grid-cols-3)
            - 4 kolom di Laptop (lg:grid-cols-4)
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}