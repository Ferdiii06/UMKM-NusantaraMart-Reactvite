import { ArrowRight } from "lucide-react";

export default function Promo() {
  return (
    <section className="w-full bg-gray-100 py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* KIRI BANNER (Sayuran) */}
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-md group transition duration-500 hover:shadow-2xl flex flex-col sm:flex-row h-auto min-h-[350px]">
          
          {/* Content */}
          <div className="p-8 md:p-10 z-10 relative flex-1 flex flex-col justify-center order-2 sm:order-1">
            <span className="inline-block bg-yellow-400 text-xs md:text-sm font-semibold px-4 py-1 rounded-full mb-4 md:mb-6 w-fit">
              Diskon 20%
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
              Sayuran Segar <br className="hidden md:block" /> dan Alami
            </h2>

            <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-8">
              Segar dari petani lokal. Sayuran sehat dan organik untuk keluarga Anda.
            </p>

            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition duration-300 hover:scale-105 w-fit">
              Belanja Sekarang <ArrowRight size={18} />
            </button>
          </div>

          {/* Image */}
          <div className="relative h-48 sm:h-auto sm:w-2/5 order-1 sm:order-2">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Sayuran"
              className="absolute inset-0 w-full h-full object-cover sm:object-contain sm:right-0 sm:bottom-0 transition duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* KANAN BANNER (Buah - Banner 2) */}
        <div className="relative bg-yellow-400 rounded-3xl overflow-hidden shadow-md group transition duration-500 hover:shadow-2xl flex flex-col sm:flex-row h-auto min-h-[350px]">

          {/* Content */}
          <div className="p-8 md:p-10 z-10 relative flex-1 flex flex-col justify-center order-2 sm:order-1">
            <span className="inline-block bg-white text-xs md:text-sm font-semibold px-4 py-1 rounded-full mb-4 md:mb-6 w-fit shadow-sm">
              Diskon 25%
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Buah Segar, <br className="hidden md:block" /> Kualitas Terbaik
            </h2>

            <p className="text-gray-800/80 text-sm md:text-base mb-6 md:mb-8">
              Buah pilihan dengan kesegaran premium dan rasa manis alami.
            </p>

            <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-medium transition duration-300 hover:scale-105 w-fit">
              Belanja Sekarang <ArrowRight size={18} />
            </button>
          </div>

          {/* Image */}
          <div className="relative h-48 sm:h-auto sm:w-2/5 order-1 sm:order-2">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80"
              alt="Buah"
              className="absolute inset-0 w-full h-full object-cover sm:object-contain sm:right-0 sm:bottom-0 transition duration-500 group-hover:scale-110"
            />
          </div>
        </div>

      </div>
    </section>
  );
}