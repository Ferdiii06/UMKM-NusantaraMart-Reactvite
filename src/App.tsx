import './App.css'

function App() {
  return (
    <>
      <section className="py-10 md:py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Bagian Teks: Order-2 di Mobile agar gambar ada di atas */}
          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black leading-tight">
              Selamat Datang di <br />
              <span className="text-green-500">Nusantara Mart</span>
            </h1>
            
            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
              <span className="italic font-medium">Nusantara Mart</span> adalah UMKM ritel modern yang menyediakan produk kebutuhan sehari-hari dengan fokus pada produk lokal unggulan dari berbagai daerah di Indonesia. Kami berkomitmen untuk memberdayakan petani dan produsen lokal dengan menyediakan platform yang memudahkan mereka menjangkau konsumen di seluruh nusantara.
            </p>
            
            <div className="pt-4">
              <a 
                href="#product" 
                className="inline-block w-full md:w-auto bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Lihat Produk
              </a>
            </div>
          </div>

          {/* Bagian Gambar: Order-1 di Mobile */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative group">
              {/* Dekorasi belakang gambar (opsional, untuk mempercantik mobile) */}
              <div className="absolute -inset-4 bg-green-100 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
              
              <img 
                src="https://i.pinimg.com/736x/d8/ca/71/d8ca71e27915c908a5d966edf8bcc3f9.jpg" 
                className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg object-contain transition-transform duration-500 hover:scale-105"
                alt="Nusantara Mart Hero"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default App;