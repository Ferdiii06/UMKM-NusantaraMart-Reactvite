import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Data kategori tetap sama sesuai file asli Anda
const categories = [
  {
    title: "Frozen Foods",
    image: "https://i.pinimg.com/1200x/95/9f/7b/959f7b3491e447311a87f99b565533f5.jpg",
    bg: "bg-green-100",
  },
  {
    title: "Meat and Fish",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
    bg: "bg-pink-100",
  },
  {
    title: "Milk & Dairy",
    image: "https://i.pinimg.com/736x/15/be/a6/15bea6e7d63ea080ea62cf78b11f461e.jpg",
    bg: "bg-gray-100",
  },
  {
    title: "Beverages",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423",
    bg: "bg-green-50",
  },
  {
    title: "Vegetables",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c",
    bg: "bg-orange-100",
  },
  {
    title: "Snacks",
    image: "https://i.pinimg.com/736x/9c/7c/2a/9c7c2ad2a132cb1f63977d37f52f828e.jpg",
    bg: "bg-yellow-100",
  },
];

export default function Category() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="w-full py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative group">
        
        {/* Header: Dibuat lebih menonjol */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Kategori Populer</h2>
          <p className="text-gray-500 text-sm md:text-base">Jelajahi Kategori Produk Kami</p>
        </div>

        {/* Navigation Buttons: Diletakkan di luar kontainer slider agar tidak menutupi kartu */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-xl p-3 rounded-full z-20 hidden md:flex items-center justify-center hover:bg-green-500 hover:text-white transition-all border border-gray-100 -ml-4 lg:-ml-6"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Slider Container: Menambahkan 'scrollbar-hide' dan padding horizontal agar kartu tidak terpotong di tepi */}
        <div
          ref={sliderRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 pb-6"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={`min-w-[160px] sm:min-w-[200px] md:min-w-[220px] h-64 md:h-72 rounded-2xl shadow-sm ${category.bg} flex flex-col items-center justify-between p-6 transition duration-300 hover:shadow-lg hover:scale-105 cursor-pointer flex-shrink-0 border border-transparent hover:border-white/50`}
            >
              <h3 className="text-sm md:text-base font-bold text-gray-700 text-center">
                {category.title}
              </h3>

              <div className="flex-1 flex items-center justify-center w-full">
                <img
                  src={`${category.image}?auto=format&fit=crop&w=300&q=80`}
                  alt={category.title}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-xl p-3 rounded-full z-20 hidden md:flex items-center justify-center hover:bg-green-500 hover:text-white transition-all border border-gray-100 -mr-4 lg:-mr-6"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>

        {/* Mobile Indicator: Memberi tahu user bahwa ini bisa di-swipe di HP */}
        <div className="flex md:hidden justify-center gap-1 mt-2">
          <div className="w-8 h-1 bg-gray-200 rounded-full italic text-[10px] text-gray-400 text-center w-full">
            ← Geser untuk melihat kategori lainnya →
          </div>
        </div>
      </div>
    </section>
  );
}