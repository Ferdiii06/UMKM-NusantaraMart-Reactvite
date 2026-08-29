import { useCart } from '../context/useCart';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productsData } from '../data/products';
import { useNavigate, useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import { ClipboardList, Bell, MapPin, ChevronDown } from 'lucide-react';
function Navbar() {
    const { totalItems, cartItems, removeFromCart } = useCart();
    const [showCart, setShowCart] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<typeof productsData>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        if (!navbarRef.current) return;

        const showAnim = gsap.from(navbarRef.current, { 
            yPercent: -100,
            paused: true,
            duration: 0.3,
            ease: "power2.out"
        }).progress(1);

        const st = ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 50) { 
                    // scroll down
                    showAnim.reverse();
                } else { 
                    // scroll up
                    showAnim.play();
                }
            }
        });

        return () => {
            st.kill();
        };
    }, []);

    // Konfigurasi Fuse.js untuk pencarian cerdas (fuzzy search)
    const fuse = new Fuse(productsData, {
        keys: ['name', 'category', 'description'],
        threshold: 0.4, // Semakin kecil semakin ketat
    });

    const handleSearchInput = (value: string) => {
        setSearchInput(value);
        if (value.trim()) {
            const results = fuse.search(value).map(result => result.item);
            setSearchResults(results);
            setShowSearchResults(true);
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setShowSearchResults(true);
        }
    };

    const goToHome = () => {
        navigate('/');
        setShowSearchResults(false);
        setShowCart(false);
    };

    const goToProductDetail = (productId: number) => {
        navigate(`/product/${productId}`);
        setShowSearchResults(false);
        setShowCart(false);
    };

    const goToCheckout = () => {
        navigate('/checkout');
        setShowCart(false);
    };

    const goToOrderHistory = () => {
        navigate('/order-history');
        setShowCart(false);
    };

    // Fungsi untuk scroll ke section tertentu
    const scrollToSection = (sectionId: string) => {
        // Jika tidak di halaman utama, navigasi ke halaman utama dulu
        if (location.pathname !== '/') {
            navigate('/');
            // Tunggu sebentar agar navigasi selesai, lalu scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Jika sudah di halaman utama, langsung scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setShowSearchResults(false);
        setShowCart(false);
    };

    // Menu items dengan section ID
    const menuItems = [
        { name: 'Beranda', sectionId: 'home' },
        { name: 'Kategori', sectionId: 'category' },
        { name: 'Produk', sectionId: 'product' },
        { name: 'Promo', sectionId: 'promo' },
        { name: 'Kontak', sectionId: 'contact' }
    ];

    return (
        <div ref={navbarRef} className="sticky top-0 z-50 w-full bg-white shadow-sm shadow-gray-200/50">
            {/* Top Bar - Location Selector */}
            <div className="hidden md:flex bg-gray-200 text-xs py-1.5 px-4 justify-between items-center z-[52] relative">
                <div className="flex items-center gap-1 text-gray-600 hover:text-green-600 cursor-pointer transition">
                    <MapPin size={14} />
                    <span>Dikirim ke: <span className="font-bold">Sidoarjo, Jawa Timur</span></span>
                    <ChevronDown size={14} />
                </div>
                <div className="flex gap-4 text-gray-500">
                    <a href="#" className="hover:text-green-600">Download App</a>
                    <a href="#" className="hover:text-green-600">Ikuti Kami</a>
                </div>
            </div>

            {/* Navbar Utama */}
            <div className='flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100 gap-4 relative z-[51]'>
                {/* Logo - klik ke beranda */}
                <h1 
                    onClick={goToHome}
                    className='text-2xl md:text-3xl font-bold text-green-600 cursor-pointer hover:text-green-700 transition'
                >
                    NusaMart
                </h1>
                
                <header className='flex items-center w-full md:w-auto gap-3 justify-between md:justify-end'>
                    {/* Pencarian */}
                    <div className="flex-1 md:flex-none relative">
                        <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
                            <input 
                                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-green-500 transition-all" 
                                type="search" 
                                placeholder="Cari produk..." 
                                value={searchInput}
                                onChange={(e) => handleSearchInput(e.target.value)}
                                onFocus={() => searchInput && setShowSearchResults(true)}
                            />
                        </form>

                        {/* Hasil pencarian */}
                        {showSearchResults && (
                            <div className="absolute top-full left-0 w-full md:w-80 bg-white shadow-xl rounded-lg mt-2 z-[60] max-h-80 overflow-y-auto border border-gray-100">
                                {searchResults.length > 0 ? (
                                    <ul className="divide-y divide-gray-100">
                                        {searchResults.map((product) => (
                                            <li 
                                                key={product.id} 
                                                className="p-3 hover:bg-green-50 cursor-pointer flex items-center gap-3"
                                                onClick={() => goToProductDetail(product.id)}
                                            >
                                                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                                                <div>
                                                    <p className="text-sm font-semibold">{product.name}</p>
                                                    <p className="text-xs text-green-600 font-bold">
                                                        Rp {product.price.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 text-sm">Produk tidak ditemukan</div>
                                )}
                                <button 
                                    className="w-full py-2 bg-gray-50 text-xs text-gray-400 border-t hover:text-red-500"
                                    onClick={() => setShowSearchResults(false)}
                                >
                                    Tutup
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Tombol Notifikasi */}
                    <div className="relative">
                        <button 
                            onClick={() => { setShowNotifications(!showNotifications); setShowCart(false); }} 
                            className="p-2 hover:bg-gray-200 rounded-full transition relative"
                            title="Notifikasi"
                        >
                            <Bell className="h-6 w-6 text-gray-700" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-gray-100">
                                3
                            </span>
                        </button>
                        
                        {/* Dropdown Notifikasi */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white shadow-2xl rounded-xl p-4 z-[70] border border-gray-100">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h3 className="text-lg font-bold">Notifikasi</h3>
                                    <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                                </div>
                                <ul className="space-y-3">
                                    <li className="text-sm p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition">
                                        <p className="font-bold text-green-600">Promo Flash Sale!</p>
                                        <p className="text-gray-500 text-xs mt-1">Diskon 50% untuk produk sayuran hari ini.</p>
                                    </li>
                                    <li className="text-sm p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition">
                                        <p className="font-bold text-blue-600">Pesanan Tiba</p>
                                        <p className="text-gray-500 text-xs mt-1">Pesanan #NM123 telah sampai di tujuan.</p>
                                    </li>
                                    <li className="text-sm p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition">
                                        <p className="font-bold text-gray-800">Selamat Datang!</p>
                                        <p className="text-gray-500 text-xs mt-1">Nikmati pengalaman belanja terbaik di Nusantara Mart.</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Tombol Riwayat Pesanan */}
                    <button 
                        onClick={goToOrderHistory} 
                        className="p-2 hover:bg-gray-200 rounded-full transition hidden md:block"
                        title="Riwayat Pesanan"
                    >
                        <ClipboardList className="h-6 w-6 text-gray-700" />
                    </button>

                    {/* Tombol Keranjang */}
                    <div className="relative">
                        <button 
                            id="cart-icon"
                            onClick={() => { setShowCart(!showCart); setShowNotifications(false); }} 
                            className="p-2 hover:bg-gray-200 rounded-full transition relative"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M16 21a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Dropdown Keranjang */}
                        {showCart && (
                            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white shadow-2xl rounded-xl p-4 z-[70] border border-gray-100">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h3 className="text-lg font-bold">Keranjang</h3>
                                    <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                                </div>
                                
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-500 text-sm py-4 text-center">Kosong</p>
                                ) : (
                                    <>
                                        <div className="max-h-60 overflow-y-auto mb-4">
                                            <ul className="space-y-3">
                                                {cartItems.map((item) => (
                                                    <li key={item.product.id} className="flex justify-between items-center text-sm gap-2">
                                                        <span className="truncate flex-1 font-medium">
                                                            {item.product.name} (x{item.quantity})
                                                        </span>
                                                        <button 
                                                            onClick={() => removeFromCart(item.product.id)} 
                                                            className="text-red-500 text-xs hover:text-red-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        {/* Tombol Checkout */}
                                        <button
                                            onClick={goToCheckout}
                                            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold hover:bg-green-700 transition"
                                        >
                                            Checkout
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </header>
            </div>

            {/* Navigasi Link - SEKARANG BISA DIPENCET */}
            <nav className="w-full bg-white border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide z-50 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-start md:justify-center items-center h-14 space-x-8 md:space-x-12">
                        {menuItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <button
                                    onClick={() => scrollToSection(item.sectionId)}
                                    className="text-gray-800 font-semibold text-sm hover:text-green-600 transition-colors py-4 border-b-2 border-transparent hover:border-green-600 cursor-pointer flex items-center gap-1"
                                >
                                    {item.name}
                                    {item.name === 'Kategori' && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                                </button>
                                
                                {/* Mega Menu untuk Kategori */}
                                {item.name === 'Kategori' && (
                                    <div className="absolute top-full left-0 w-[500px] bg-white shadow-xl rounded-xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[80] border border-gray-100 grid grid-cols-3 gap-6 transform translate-y-2 group-hover:translate-y-0 text-left">
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Sayur & Buah</h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="hover:text-green-600 cursor-pointer transition">Sayuran Hijau</li>
                                                <li className="hover:text-green-600 cursor-pointer transition">Buah Segar</li>
                                                <li className="hover:text-green-600 cursor-pointer transition">Bumbu Dapur</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Daging & Ikan</h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="hover:text-green-600 cursor-pointer transition">Daging Sapi</li>
                                                <li className="hover:text-green-600 cursor-pointer transition">Daging Ayam</li>
                                                <li className="hover:text-green-600 cursor-pointer transition">Ikan Laut</li>
                                            </ul>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4 flex flex-col justify-center items-center text-center group/promo cursor-pointer">
                                            <img src="https://i.pinimg.com/736x/d8/ca/71/d8ca71e27915c908a5d966edf8bcc3f9.jpg" alt="Promo" className="w-16 h-16 object-contain mb-2 group-hover/promo:scale-110 transition-transform" />
                                            <p className="font-bold text-green-700 text-sm">Diskon Spesial</p>
                                            <p className="text-xs text-green-600">Sembako Murah</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;