import { useState, } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Filter } from "lucide-react";
import { useCart } from "../context/useCart";
import { productsData } from "../data/products";
import type { Product } from "../data/products";

// Card Component untuk menampilkan setiap produk
function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 p-4 flex flex-col h-full">
      
      {/* Container Gambar */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="h-32 md:h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-4 cursor-pointer hover:opacity-90 transition"
      >
        <img
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
      
      {/* Berat */}
      <p className="text-xs md:text-sm text-gray-500 mb-2">{product.weight}</p>
      
      {/* Harga */}
      <p className="text-xl md:text-2xl font-bold text-green-600 mb-4">
        Rp {formatRupiah(product.price)}
      </p>

      {/* Kategori Badge */}
      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-3 w-fit">
        {product.category}
      </span>

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

export default function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "name">("default");
  
  // Decode category name dari URL
  const decodedCategory = categoryName ? decodeURIComponent(categoryName) : "";
  
  // Filter produk berdasarkan kategori
  const categoryProducts = productsData.filter(
    product => product.category.toLowerCase() === decodedCategory.toLowerCase()
  );
  
  // Sort produk
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return a.id - b.id;
    }
  });

  // Dapatkan semua kategori unik untuk navigasi cepat
  const allCategories = [...new Set(productsData.map(p => p.category))];

  // Jika kategori tidak ditemukan
  if (!decodedCategory || categoryProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kategori Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Maaf, kategori yang Anda cari tidak tersedia</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header dengan Tombol Kembali */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition w-fit"
          >
            <ArrowLeft size={20} />
            <span className="text-sm md:text-base">Kembali</span>
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Kategori: {decodedCategory}
          </h1>
          
          {/* Info jumlah produk */}
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm w-fit">
            {categoryProducts.length} produk ditemukan
          </div>
        </div>

        {/* Navigasi Kategori Lainnya (Horizontal Scroll) */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  cat === decodedCategory
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Section */}
        <div className="mb-6 flex justify-end">
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm text-gray-600">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
            >
              <option value="default">Default</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
        </div>

        {/* Grid Produk */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada produk di kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
}