import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Tag, Copy, CheckCircle, ShoppingBag, Sparkles } from "lucide-react";
import { getActivePromos } from "../context/promo"; // Import dari context, bukan data

export default function Promo() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const activePromos = getActivePromos();

  console.log("Active Promos:", activePromos); // Untuk debugging

  const handlePromoClick = (category?: string) => {
    if (category) {
      navigate(`/category/${encodeURIComponent(category)}`);
    } else {
      navigate("/products");
    }
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section dengan dekorasi */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5">
            <Sparkles size={120} className="text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Promo Spesial
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Dapatkan diskon menarik untuk berbagai produk pilihan. 
            Gunakan kode promo sebelum checkout!
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {activePromos.length === 0 ? (
          /* Tampilan ketika tidak ada promo */
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Promo Aktif</h3>
            <p className="text-gray-500 mb-6">Nantikan promo menarik lainnya!</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Belanja Sekarang <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {activePromos.map((promo) => (
                <div 
                  key={promo.id} 
                  className="relative h-64 md:h-72 rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                  onClick={() => handlePromoClick(promo.category)}
                >
                  {/* Background Image */}
                  <img 
                    src={promo.image} 
                    alt={promo.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                    {/* Top part: Discount Badge */}
                    <div className="flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {promo.category || 'Spesial'}
                      </span>
                      <div className="bg-green-500 text-white text-xs md:text-sm font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                        {promo.discountType === "percentage" ? `${promo.discountValue}% OFF` : `Rp${promo.discountValue/1000}k OFF`}
                      </div>
                    </div>

                    {/* Bottom part: Text & Code */}
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-white text-xl md:text-2xl leading-tight mb-2 group-hover:text-green-400 transition-colors">
                        {promo.title}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-sm line-clamp-2 mb-4">
                        {promo.description}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/20 pt-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">Gunakan Kode</span>
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg text-white font-mono font-bold text-sm tracking-widest w-max">
                            {promo.code}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            copyPromoCode(promo.code);
                          }}
                          className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                            copiedCode === promo.code 
                              ? "bg-green-500 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]" 
                              : "bg-white/10 border-white/30 text-white hover:bg-white hover:text-green-600 hover:scale-110"
                          }`}
                          title="Salin kode"
                        >
                          {copiedCode === promo.code ? <CheckCircle size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Informasi Promo */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-3 rounded-full border border-amber-200 shadow-sm">
                <span className="text-amber-500 font-bold">⏰</span>
                <p className="text-xs md:text-sm text-amber-700 font-medium">
                  Klaim kode voucher di atas saat proses pembayaran (checkout).
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}