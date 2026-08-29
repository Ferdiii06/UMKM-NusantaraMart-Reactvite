import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Minus, 
  Plus, 
  Truck,
  Shield,
  RefreshCw,
  Heart,
  Share2
} from "lucide-react";
import { useCart } from "../context/useCart";
import { productsData } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { addToCart } = useCart();
  
  // Cari produk berdasarkan ID
  const product = productsData.find(p => p.id === Number(id));
  
  // Produk rekomendasi
  const recommendedProducts = productsData
    .filter(p => p.id !== Number(id))
    .slice(0, 4);
  
  // Fungsi untuk format harga Rupiah
  const formatRupiah = (price: number) => {
    return price.toLocaleString('id-ID');
  };
  
  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produk Tidak Ditemukan</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-medium transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Dummy images
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm md:text-base">Kembali ke Produk</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Grid untuk layout detail produk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
            
            {/* Bagian Kiri - Gallery Gambar */}
            <div className="space-y-4">
              {/* Gambar Utama */}
              <div className="bg-gray-50 rounded-xl overflow-hidden h-[300px] md:h-[400px] flex items-center justify-center p-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-50 rounded-lg overflow-hidden h-16 md:h-20 p-2 border-2 transition ${
                      selectedImage === index 
                        ? 'border-green-500' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Bagian Kanan - Informasi Produk */}
            <div className="space-y-6">
              
              {/* Header Info */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-500 text-sm md:text-base">{product.weight}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(150+ ulasan)</span>
              </div>

              {/* Harga dengan format Rupiah yang benar */}
              <div className="border-y border-gray-100 py-4">
                <p className="text-3xl md:text-4xl font-bold text-green-600">
                  Rp {formatRupiah(product.price)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Harga sudah termasuk pajak
                </p>
              </div>

              {/* Deskripsi */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {product.description || 
                    `${product.name} berkualitas tinggi, dipilih langsung dari petani lokal terbaik. 
                    Dikemas secara higienis dan siap dikirim ke rumah Anda. Cocok untuk konsumsi sehari-hari 
                    maupun kebutuhan dapur Anda.`}
                </p>
              </div>

              {/* Spesifikasi */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-gray-800 mb-2">Spesifikasi Produk</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-500">Berat</span>
                  <span className="text-gray-800 font-medium">{product.weight}</span>
                  
                  <span className="text-gray-500">Kategori</span>
                  <span className="text-gray-800 font-medium">{product.category || "Produk Lokal"}</span>
                  
                  <span className="text-gray-500">Stok</span>
                  <span className="text-green-600 font-medium">Tersedia</span>
                  
                  <span className="text-gray-500">Asal</span>
                  <span className="text-gray-800 font-medium">Indonesia</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Jumlah:</span>
                <div className="flex items-center border border-gray-200 rounded-full">
                  <button
                    onClick={decrease}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-green-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">{qty}</span>
                  <button
                    onClick={increase}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-green-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Tersedia 100+
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => {
                    addToCart(product, qty);
                    alert('Produk berhasil ditambahkan ke keranjang!');
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Tambah ke Keranjang
                </button>
                
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium transition">
                  Beli Sekarang
                </button>
              </div>

              {/* Secondary Buttons */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                  <Heart size={18} />
                  <span className="text-sm">Favorit</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                  <Share2 size={18} />
                  <span className="text-sm">Bagikan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Info Pengiriman & Layanan */}
          <div className="border-t border-gray-100 p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Truck className="text-green-500 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-800">Gratis Pengiriman</h4>
                  <p className="text-sm text-gray-500">Untuk pembelian minimal Rp 50.000</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="text-green-500 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-800">Garansi Kualitas</h4>
                  <p className="text-sm text-gray-500">Produk segar atau uang kembali</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <RefreshCw className="text-green-500 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-800">Mudah Dikembalikan</h4>
                  <p className="text-sm text-gray-500">Pengembalian dalam 24 jam</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produk Rekomendasi */}
        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Produk Rekomendasi</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((recProduct) => (
                <Link 
                  key={recProduct.id} 
                  to={`/product/${recProduct.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4"
                >
                  <div className="h-32 bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                    <img 
                      src={recProduct.image} 
                      alt={recProduct.name}
                      className="h-full object-contain"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm truncate">
                    {recProduct.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{recProduct.weight}</p>
                  <p className="text-green-600 font-bold text-sm">
                    Rp {formatRupiah(recProduct.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}