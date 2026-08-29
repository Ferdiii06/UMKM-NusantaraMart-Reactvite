import { useNavigate } from "react-router-dom";

// Data kategori dengan mapping ke kategori di products.ts
const categories = [
  {
    title: "Frozen Food",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9", // Daging/Frozen (Frozen peas/meat)
    bg: "bg-green-100",
  },
  {
    title: "Sayuran",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37", // Sayuran
    bg: "bg-orange-100",
  },
  {
    title: "Beras",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c", // Beras
    bg: "bg-gray-100",
  },
  {
    title: "Sembako",
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca", // Minyak/Sembako
    bg: "bg-green-50",
  },
  {
    title: "Minuman",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97", // Minuman botol
    bg: "bg-blue-100",
  },
  {
    title: "Snacks",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60", // Snack/Cemilan
    bg: "bg-yellow-100",
  },
  {
    title: "Kebutuhan Rumah",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17", // Alat kebersihan
    bg: "bg-purple-100",
  },
];

export default function Category() {
  const navigate = useNavigate();

  // Fungsi untuk menangani klik kategori
  const handleCategoryClick = (categoryTitle: string) => {
    const encodedCategory = encodeURIComponent(categoryTitle);
    navigate(`/category/${encodedCategory}`);
  };

  return (
    <section className="w-full py-10 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-6 md:mb-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Kategori</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Pilihan kategori untuk Anda</p>
          </div>
        </div>

        {/* Grid Ikon Minimalis */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-y-6 gap-x-2 md:gap-6 justify-items-center">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.title)}
              className="flex flex-col items-center gap-3 cursor-pointer group w-full max-w-[90px] md:max-w-[120px]"
            >
              {/* Ikon Bulat */}
              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-full ${category.bg} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden border-2 border-transparent group-hover:border-green-400`}>
                <img
                  src={`${category.image}?auto=format&fit=crop&w=150&q=80`}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Teks Kategori */}
              <span className="text-[10px] md:text-xs font-semibold text-gray-700 text-center leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
                {category.title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}